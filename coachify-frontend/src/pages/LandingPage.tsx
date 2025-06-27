import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';
import { Link } from 'react-router-dom';
import { 
    ArrowRightIcon, 
    PlayIcon,
    CheckIcon,
    StarIcon,
    UserGroupIcon,
    ChartBarIcon,
    TrophyIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  
  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "none",
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom",
          end: rotationEnd,
          scrub: true,
        },
      }
    );

    const wordElements = el.querySelectorAll<HTMLElement>(".word");
    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: "opacity" },
      {
        ease: "none",
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom-=20%",
          end: wordAnimationEnd,
          scrub: true,
        },
      }
    );

    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: "none",
          filter: "blur(0px)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom-=20%",
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]);

  return (
    <h1 ref={containerRef} className={`my-5 ${containerClassName}`}>
      <div className={`${textClassName}`}>
        {splitText}
      </div>
    </h1>
  );
};

export default function LandingPage() {
    const features = [
        {
            name: 'Sportoló kezelés',
            description: 'Átfogó sportoló profilok teljesítmény követéssel és részletes analitikával.',
            icon: UserGroupIcon,
        },
        {
            name: 'Teljesítmény analitika',
            description: 'Fejlett metrikák és betekintések, hogy segítsünk a sportolóknak elérni a potenciáljukat.',
            icon: ChartBarIcon,
        },
        {
            name: 'Eredmény követés',
            description: 'Figyelje a fejlődést és ünneplje a mérföldköveket az eredménykövetési rendszerrel.',
            icon: TrophyIcon,
        },
        {
            name: 'Okos betekintések',
            description: 'AI-alapú ajánlások és személyre szabott edzési javaslatok.',
            icon: SparklesIcon,
        },
    ];

    const testimonials = [
        {
            name: 'Kovács Péter',
            role: 'Atlétika edző',
            content: 'A Coachify forradalmasította a csapatkezelésem. Az analitikák hihetetlen pontosak!',
            rating: 5,
        },
        {
            name: 'Nagy Eszter',
            role: 'Úszó edző',
            content: 'A teljesítménykövetési funkciók átlagosan 15%-kal javították a sportolók eredményeit.',
            rating: 5,
        },
        {
            name: 'Szabó János',
            role: 'Tenisz edző',
            content: 'A legjobb befektetés, amit az edzői karrierem során tettem. Szívből ajánlom!',
            rating: 5,
        },
    ];

    const pricingPlans = [
        {
            name: 'Kezdő',
            price: '5.990 Ft',
            description: 'Tökéletes egyéni edzőknek',
            features: ['Maximum 10 sportoló', 'Alapvető analitika', 'Email támogatás', 'Mobil alkalmazás'],
            popular: false,
        },
        {
            name: 'Professzionális',
            price: '14.990 Ft',
            description: 'Növekvő csapatoknak',
            features: ['Maximum 50 sportoló', 'Fejlett analitika', 'Prioritásos támogatás', 'Csapat együttműködés', 'Egyedi jelentések'],
            popular: true,
        },
        {
            name: 'Vállalati',
            price: '29.990 Ft',
            description: 'Nagy szervezeteknek',
            features: ['Korlátlan sportolók', 'Prémium analitika', '24/7 támogatás', 'API hozzáférés', 'Egyedi integrációk'],
            popular: false,
        },
    ];

    return (
        <div className="w-full min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative w-full overflow-hidden">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-20 pb-16">
                    <div className="text-center">
                        <ScrollReveal
                            enableBlur={true}
                            baseOpacity={0.15}
                            baseRotation={2}
                            blurStrength={6}
                            containerClassName="mb-6"
                            textClassName="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground leading-tight tracking-tight"
                            rotationEnd="bottom bottom"
                            wordAnimationEnd="center center"
                        >
                            Emeld a sportolóidat bajnoki szintre
                        </ScrollReveal>
                        
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto px-4">
                            A teljes platform edzőknek a sportolói teljesítmény kezelésére, követésére és elemzésére. 
                            Alakítsd át az adatokat győzelmekké a legmodernebb sportmenedzsment eszközeinkkel.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200"
                            >
                                Ingyenes próba
                                <ArrowRightIcon className="ml-2 h-5 w-5" />
                            </Link>
                            <button className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-background text-muted-foreground font-semibold rounded-lg border border-border hover:bg-muted transition-all duration-200">
                                <PlayIcon className="mr-2 h-5 w-5" />
                                Demó megtekintése
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hero Image/Illustration */}
                <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-20">
                    <div className="border border-border rounded-lg p-4 md:p-8">
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-16 md:w-24 h-16 md:h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrophyIcon className="h-8 md:h-12 w-8 md:w-12 text-primary-foreground" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">Dashboard előnézet</h3>
                                <p className="text-muted-foreground text-sm md:text-base">Interaktív demó hamarosan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="w-full py-12 md:py-20 bg-muted">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16">
                        <ScrollReveal
                            enableBlur={true}
                            baseOpacity={0.2}
                            baseRotation={1}
                            blurStrength={4}
                            containerClassName="mb-4"
                            textClassName="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground"
                            rotationEnd="bottom center"
                            wordAnimationEnd="bottom center"
                        >
                            Minden, amire szükséged van a sikerhez
                        </ScrollReveal>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            Hatékony funkciók, kifejezetten edzőknek és sport szakembereknek tervezve
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <div key={feature.name} className="bg-background border border-border rounded-lg p-6 hover:border-primary/30 transition-all duration-200">
                                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                                        <Icon className="h-6 w-6 text-primary-foreground" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.name}</h3>
                                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="w-full py-12 md:py-20">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16">
                        <ScrollReveal
                            enableBlur={true}
                            baseOpacity={0.2}
                            baseRotation={1}
                            blurStrength={3}
                            containerClassName="mb-4"
                            textClassName="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground"
                            rotationEnd="bottom center"
                            wordAnimationEnd="bottom center"
                        >
                            Edzők szeretik világszerte
                        </ScrollReveal>
                        <p className="text-lg md:text-xl text-muted-foreground">
                            Nézd meg, mit mond rólunk a közösségünk
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-background border border-border rounded-lg p-6">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-popover-foreground mb-4 text-sm md:text-base">"{testimonial.content}"</p>
                                <div>
                                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="w-full py-12 md:py-20 bg-muted">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                            Egyszerű, átlátható árazás
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground">
                            Válaszd ki a tökéletes csomagot a csapatodnak
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {pricingPlans.map((plan, index) => (
                            <div key={index} className={`bg-background border rounded-lg p-6 md:p-8 transition-all duration-200 hover:border-primary/30 ${plan.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border'}`}>
                                {plan.popular && (
                                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                                        Legnépszerűbb
                                    </div>
                                )}
                                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                                <p className="text-muted-foreground mb-4 text-sm md:text-base">{plan.description}</p>
                                <div className="mb-6">
                                    <span className="text-3xl md:text-4xl font-bold text-foreground">{plan.price}</span>
                                    <span className="text-muted-foreground">/hónap</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center">
                                            <CheckIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                                            <span className="text-popover-foreground text-sm md:text-base">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    to="/register"
                                    className={`block w-full py-3 px-4 rounded-lg font-semibold text-center transition-all duration-200 text-sm md:text-base ${
                                        plan.popular
                                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                    }`}
                                >
                                    Kezdés
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="w-full py-12 md:py-20">
                <div className="w-full max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <ScrollReveal
                        enableBlur={true}
                        baseOpacity={0.2}
                        baseRotation={1}
                        blurStrength={3}
                        containerClassName="mb-4"
                        textClassName="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground"
                        rotationEnd="bottom center"
                        wordAnimationEnd="bottom center"
                    >
                        Készen állsz az edzői munkád átalakítására?
                    </ScrollReveal>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8">
                        Csatlakozz több ezer edzőhöz, akik már a Coachify-t használják jobb eredmények eléréséhez
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200"
                        >
                            Ingyenes próba indítása
                            <ArrowRightIcon className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-background text-muted-foreground font-semibold rounded-lg border border-border hover:bg-muted transition-all duration-200"
                        >
                            Kapcsolat felvétele
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full bg-primary text-primary-foreground py-8 md:py-12">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="col-span-1 sm:col-span-2 md:col-span-1">
                            <div className="flex items-center mb-4">
                                <div className="relative w-10 h-10">
                                    <div className="absolute inset-0 bg-primary-foreground rounded-lg"></div>
                                    <div className="absolute w-3 h-3 bg-primary rounded top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                                </div>
                                <span className="ml-3 text-xl font-bold">Coachify</span>
                            </div>
                            <p className="text-primary-foreground/80 text-sm md:text-base">
                                Felhatalmazzuk az edzőket és sportolókat, hogy elérjék teljes potenciáljukat adatalapú betekintésekkel.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Termék</h3>
                            <ul className="space-y-2 text-primary-foreground/80 text-sm md:text-base">
                                <li><Link to="/features" className="hover:text-primary-foreground transition-colors">Funkciók</Link></li>
                                <li><Link to="/pricing" className="hover:text-primary-foreground transition-colors">Árazás</Link></li>
                                <li><Link to="/integrations" className="hover:text-primary-foreground transition-colors">Integrációk</Link></li>
                                <li><Link to="/api" className="hover:text-primary-foreground transition-colors">API</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Cég</h3>
                            <ul className="space-y-2 text-primary-foreground/80 text-sm md:text-base">
                                <li><Link to="/about" className="hover:text-primary-foreground transition-colors">Rólunk</Link></li>
                                <li><Link to="/careers" className="hover:text-primary-foreground transition-colors">Karrier</Link></li>
                                <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Kapcsolat</Link></li>
                                <li><Link to="/blog" className="hover:text-primary-foreground transition-colors">Blog</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Támogatás</h3>
                            <ul className="space-y-2 text-primary-foreground/80 text-sm md:text-base">
                                <li><Link to="/help" className="hover:text-primary-foreground transition-colors">Súgó központ</Link></li>
                                <li><Link to="/documentation" className="hover:text-primary-foreground transition-colors">Dokumentáció</Link></li>
                                <li><Link to="/status" className="hover:text-primary-foreground transition-colors">Állapot</Link></li>
                                <li><Link to="/privacy" className="hover:text-primary-foreground transition-colors">Adatvédelem</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
                        <p className="text-sm md:text-base">&copy; 2025 Coachify. Minden jog fenntartva.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}