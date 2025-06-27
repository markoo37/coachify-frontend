import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useModals } from '../hooks/useModals';
import Notification from '../components/ui/Notification';
import ErrorModal from '../components/ui/ErrorModal';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { motion, AnimatePresence } from 'framer-motion';

// Shadcn/ui imports
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import { Loader2, Plus, Users, UserCheck, UserX, Mail, Calendar, Weight, Ruler, Trash2, Info, ChevronDown } from 'lucide-react';

interface Athlete {
  Id: number;
  FirstName: string;
  LastName: string;
  BirthDate?: string;
  Weight?: number;
  Height?: number;
  TeamId?: number;
  Email?: string;
  HasUserAccount: boolean;
}

interface CreateAthleteDto {
  FirstName: string;
  LastName: string;
  BirthDate: string;
  Weight: number;
  Height: number;
  Email: string;
  TeamId?: number;
}

interface FormDataState {
  FirstName: string;
  LastName: string;
  BirthDate: Date | undefined;
  Weight: number;
  Height: number;
  Email: string;
}

export default function AthletesPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingAthleteId, setDeletingAthleteId] = useState<number | null>(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  
  const [formData, setFormData] = useState<FormDataState>({
    FirstName: '',
    LastName: '',
    BirthDate: undefined,
    Weight: 0,
    Height: 0,
    Email: ''
  });

  const {
    confirmModal,
    errorModal,
    notification,
    showNotification,
    hideNotification,
    showError,
    hideError,
    showConfirmation,
    hideConfirmation,
  } = useModals();

  useEffect(() => {
    fetchAthletes();
  }, []);

  const fetchAthletes = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/athletes');
      setAthletes(res.data);
    } catch (err: any) {
      console.error('Error fetching athletes:', err);
      setError('Nem sikerült betölteni a sportolókat. Próbáld újra!');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Nincs adat';
    return new Date(dateString).toLocaleDateString('hu-HU');
  };

  const calculateAge = (birthDate?: string) => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    return Math.floor((today.getTime() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Weight' || name === 'Height' ? Number(value) : value
    }));
  };

  const handleSubmitAthlete = async () => {
    const { FirstName, LastName, BirthDate, Email } = formData;
    if (!FirstName || !LastName || !BirthDate || !Email) {
      showError('Hiányzó adat', 'Kérlek tölts ki minden kötelező mezőt (név, születési dátum és email).');
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Convert Date to ISO string for API
      const submitData: CreateAthleteDto = {
        ...formData,
        BirthDate: BirthDate.toISOString().split('T')[0] // YYYY-MM-DD format
      };
      
      await api.post<CreateAthleteDto>('/athletes', submitData);
      await fetchAthletes();
      setShowAddForm(false);
      setFormData({ FirstName: '', LastName: '', BirthDate: undefined, Weight: 0, Height: 0, Email: '' });
      showNotification('Sportoló hozzáadva', 'success');
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.response?.data || 'Nem sikerült a sportoló hozzáadása. Próbáld újra!';
      showError('Hiba', message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelAddAthlete = () => {
    setShowAddForm(false);
    setFormData({ FirstName: '', LastName: '', BirthDate: undefined, Weight: 0, Height: 0, Email: '' });
    setDatePickerOpen(false);
  };

  const handleDeleteAthlete = (athleteId: number, name: string) => {
    showConfirmation('Sportoló törlése', `Biztos törlöd: ${name}?`, async () => {
      setDeletingAthleteId(athleteId);
      try {
        await api.delete(`/athletes/${athleteId}`);
        await fetchAthletes();
        showNotification('Törölve', 'success');
      } catch {
        showError('Hiba', 'Nem sikerült törölni. Próbáld újra!');
      } finally {
        setDeletingAthleteId(null);
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Sportolók betöltése...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background lg:pl-64">
        <div className="px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <Alert variant="destructive">
              <AlertDescription className="mb-4">{error}</AlertDescription>
              <Button onClick={fetchAthletes} variant="outline">
                Újrapróbálkozás
              </Button>
            </Alert>
          </div>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="min-h-screen bg-background lg:pl-64">
        <div className="px-8 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="relative inline-flex items-center justify-center w-16 h-16 mb-6">
                <div className="absolute inset-0 bg-primary rounded-lg"></div>
                <Users className="h-8 w-8 text-primary-foreground relative z-10" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">
                Összes sportoló
              </h1>
              <p className="text-muted-foreground text-base">
                {athletes.length} sportoló összesen
              </p>
            </div>

            {/* Add Athlete Button */}
            <div className="flex justify-end mb-8">
              <Button 
                onClick={() => setShowAddForm(true)}
                size="lg"
                className="shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="mr-2 h-4 w-4" />
                Új sportoló
              </Button>
            </div>

            {/* Add Athlete Form with Animation */}
            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8 overflow-hidden"
                >
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Plus className="mr-2 h-5 w-5" />
                        Új sportoló hozzáadása
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="FirstName">Keresztnév *</Label>
                          <Input
                            id="FirstName"
                            name="FirstName"
                            value={formData.FirstName}
                            onChange={handleInputChange}
                            placeholder="Keresztnév"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="LastName">Vezetéknév *</Label>
                          <Input
                            id="LastName"
                            name="LastName"
                            value={formData.LastName}
                            onChange={handleInputChange}
                            placeholder="Vezetéknév"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="BirthDate">Születési dátum *</Label>
                          <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                id="BirthDate"
                                className={cn(
                                  "w-full justify-between font-normal",
                                  !formData.BirthDate && "text-muted-foreground"
                                )}
                              >
                                {formData.BirthDate ? (
                                  format(formData.BirthDate, "yyyy. MMMM d.", { locale: hu })
                                ) : (
                                  "Válassz dátumot"
                                )}
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={formData.BirthDate}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                  setFormData(prev => ({ ...prev, BirthDate: date }));
                                  setDatePickerOpen(false);
                                }}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                locale={hu}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="Email">Email *</Label>
                          <Input
                            id="Email"
                            name="Email"
                            type="email"
                            value={formData.Email}
                            onChange={handleInputChange}
                            placeholder="sportoló@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="Weight">Súly (kg)</Label>
                          <Input
                            id="Weight"
                            name="Weight"
                            type="number"
                            value={formData.Weight || ''}
                            onChange={handleInputChange}
                            placeholder="70"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="Height">Magasság (cm)</Label>
                          <Input
                            id="Height"
                            name="Height"
                            type="number"
                            value={formData.Height || ''}
                            onChange={handleInputChange}
                            placeholder="175"
                          />
                        </div>
                      </div>

                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          A sportoló először nem lesz hozzárendelve egy csapathoz sem. Később hozzáadhatod csapatokhoz a "Csapataim" oldalon.
                        </AlertDescription>
                      </Alert>

                      <div className="flex justify-end space-x-3">
                        <Button variant="outline" onClick={cancelAddAthlete}>
                          Mégse
                        </Button>
                        <Button 
                          onClick={handleSubmitAthlete}
                          disabled={isSubmitting}
                        >
                          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {isSubmitting ? 'Hozzáadás...' : 'Hozzáadás'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {athletes.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent className="space-y-4">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Nincsenek sportolók</h3>
                    <p className="text-muted-foreground mb-4">Kezdj sportolók hozzáadásával.</p>
                    <Button onClick={() => setShowAddForm(true)} size="lg">
                      <Plus className="mr-2 h-4 w-4" />
                      Első sportoló hozzáadása
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {athletes.map((athlete) => {
                  const age = calculateAge(athlete.BirthDate);
                  return (
                    <Card 
                      key={athlete.Id}
                      className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">
                              {athlete.FirstName} {athlete.LastName}
                            </CardTitle>
                            {age && (
                              <CardDescription>{age} éves</CardDescription>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={athlete.HasUserAccount ? "default" : "secondary"}>
                              {athlete.HasUserAccount ? (
                                <>
                                  <UserCheck className="w-3 h-3 mr-1" />
                                  App felhasználó
                                </>
                              ) : (
                                <>
                                  <UserX className="w-3 h-3 mr-1" />
                                  Nincs app
                                </>
                              )}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        {athlete.Email && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Mail className="w-4 h-4 mr-3 shrink-0" />
                            <span className="truncate">{athlete.Email}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-3 shrink-0" />
                          <span>Született: {formatDate(athlete.BirthDate)}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          {athlete.Weight && (
                            <div className="flex items-center">
                              <Weight className="w-4 h-4 mr-2" />
                              <span>{athlete.Weight} kg</span>
                            </div>
                          )}

                          {athlete.Height && (
                            <div className="flex items-center">
                              <Ruler className="w-4 h-4 mr-2" />
                              <span>{athlete.Height} cm</span>
                            </div>
                          )}
                        </div>

                        {!athlete.HasUserAccount && athlete.Email && (
                          <Alert className="mt-4">
                            <Info className="h-4 w-4" />
                            <AlertDescription className="text-xs">
                              Ez a sportoló regisztrálhat a mobil alkalmazásra az email címével
                            </AlertDescription>
                          </Alert>
                        )}

                        <div className="pt-3 border-t">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteAthlete(athlete.Id, `${athlete.FirstName} ${athlete.LastName}`)}
                            disabled={deletingAthleteId === athlete.Id}
                            className="w-full"
                          >
                            {deletingAthleteId === athlete.Id ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Törlés...
                              </>
                            ) : (
                              <>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Törlés
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Statistics Summary */}
            {athletes.length > 0 && (
              <div className="mt-12 border-t border-border pt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="text-center hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-foreground">{athletes.length}</div>
                      <div className="text-sm text-muted-foreground">Összes sportoló</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-green-600">
                        {athletes.filter(a => a.HasUserAccount).length}
                      </div>
                      <div className="text-sm text-muted-foreground">App felhasználó</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-muted-foreground">
                        {athletes.filter(a => !a.HasUserAccount).length}
                      </div>
                      <div className="text-sm text-muted-foreground">Nincs még app</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText="Törlés"
        cancelText="Mégse"
        onConfirm={() => {
          confirmModal.onConfirm();
          hideConfirmation();
        }}
        onCancel={hideConfirmation}
        isLoading={deletingAthleteId !== null}
        type={confirmModal.type}
      />

      <ErrorModal
        isOpen={errorModal.isOpen}
        title={errorModal.title}
        message={errorModal.message}
        onClose={hideError}
      />

      <Notification
        isVisible={notification.isVisible}
        message={notification.message}
        type={notification.type}
        onClose={hideNotification}
      />
    </React.Fragment>
  );
}