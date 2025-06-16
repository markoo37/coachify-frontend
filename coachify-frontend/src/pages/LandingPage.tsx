import React from 'react';
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

export default function LandingPage() {
    const features = [
        {
            name: 'Athlete Management',
            description: 'Comprehensive athlete profiles with performance tracking and detailed analytics.',
            icon: UserGroupIcon,
        },
        {
            name: 'Performance Analytics',
            description: 'Advanced metrics and insights to help athletes reach their full potential.',
            icon: ChartBarIcon,
        },
        {
            name: 'Achievement Tracking',
            description: 'Monitor progress and celebrate milestones with our achievement system.',
            icon: TrophyIcon,
        },
        {
            name: 'Smart Insights',
            description: 'AI-powered recommendations and personalized training suggestions.',
            icon: SparklesIcon,
        },
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Track & Field Coach',
            content: 'AthleteHub has revolutionized how I manage my team. The analytics are incredible!',
            rating: 5,
        },
        {
            name: 'Mike Chen',
            role: 'Swimming Coach',
            content: 'The performance tracking features have helped my athletes improve by 15% on average.',
            rating: 5,
        },
        {
            name: 'Elena Rodriguez',
            role: 'Tennis Coach',
            content: 'Best investment I\'ve made for my coaching career. Highly recommended!',
            rating: 5,
        },
    ];

    const pricingPlans = [
        {
            name: 'Starter',
            price: '$19',
            description: 'Perfect for individual coaches',
            features: ['Up to 10 athletes', 'Basic analytics', 'Email support', 'Mobile app access'],
            popular: false,
        },
        {
            name: 'Professional',
            price: '$49',
            description: 'For growing teams',
            features: ['Up to 50 athletes', 'Advanced analytics', 'Priority support', 'Team collaboration', 'Custom reports'],
            popular: true,
        },
        {
            name: 'Enterprise',
            price: '$99',
            description: 'For large organizations',
            features: ['Unlimited athletes', 'Premium analytics', '24/7 support', 'API access', 'Custom integrations'],
            popular: false,
        },
    ];

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Hero Section */}
            <div className="relative w-full overflow-hidden">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-20 pb-16">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Elevate Your Athletes to
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block mt-2">
                                Championship Level
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto px-4">
                            The complete platform for coaches to manage, track, and analyze athlete performance. 
                            Turn data into victories with our cutting-edge sports management tools.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Start Free Trial
                                <ArrowRightIcon className="ml-2 h-5 w-5" />
                            </Link>
                            <button className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white/70 backdrop-blur-xl text-gray-700 font-medium rounded-2xl border border-gray-200 hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl">
                                <PlayIcon className="mr-2 h-5 w-5" />
                                Watch Demo
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hero Image/Illustration */}
                <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-20">
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-4 md:p-8">
                        <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-16 md:w-24 h-16 md:h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrophyIcon className="h-8 md:h-12 w-8 md:w-12 text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Dashboard Preview</h3>
                                <p className="text-gray-600 text-sm md:text-base">Interactive demo coming soon</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="w-full py-12 md:py-20 bg-white/50">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Everything you need to succeed
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            Powerful features designed specifically for coaches and sports professionals
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <div key={feature.name} className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
                                    <p className="text-gray-600 text-sm">{feature.description}</p>
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
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Loved by coaches worldwide
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600">
                            See what our community has to say about AthleteHub
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4 text-sm md:text-base">"{testimonial.content}"</p>
                                <div>
                                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="w-full py-12 md:py-20 bg-white/50">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Simple, transparent pricing
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600">
                            Choose the perfect plan for your team
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {pricingPlans.map((plan, index) => (
                            <div key={index} className={`bg-white/70 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-lg border transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${plan.popular ? 'border-blue-200 ring-2 ring-blue-500 ring-opacity-20' : 'border-white/20'}`}>
                                {plan.popular && (
                                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <p className="text-gray-600 mb-4 text-sm md:text-base">{plan.description}</p>
                                <div className="mb-6">
                                    <span className="text-3xl md:text-4xl font-bold text-gray-900">{plan.price}</span>
                                    <span className="text-gray-600">/month</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center">
                                            <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                            <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    to="/register"
                                    className={`block w-full py-3 px-4 rounded-xl font-medium text-center transition-all duration-200 text-sm md:text-base ${
                                        plan.popular
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg'
                                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                    }`}
                                >
                                    Get Started
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="w-full py-12 md:py-20">
                <div className="w-full max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Ready to transform your coaching?
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 mb-8">
                        Join thousands of coaches who are already using AthleteHub to achieve better results
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Start Your Free Trial
                            <ArrowRightIcon className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white/70 backdrop-blur-xl text-gray-700 font-medium rounded-2xl border border-gray-200 hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full bg-gray-900 text-white py-8 md:py-12">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="col-span-1 sm:col-span-2 md:col-span-1">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                                    <span className="text-xl font-bold text-white">A</span>
                                </div>
                                <span className="ml-3 text-xl font-bold">AthleteHub</span>
                            </div>
                            <p className="text-gray-400 text-sm md:text-base">
                                Empowering coaches and athletes to reach their full potential through data-driven insights.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                                <li><Link to="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
                                <li><Link to="/api" className="hover:text-white transition-colors">API</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Company</h3>
                            <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                                <li><Link to="/documentation" className="hover:text-white transition-colors">Documentation</Link></li>
                                <li><Link to="/status" className="hover:text-white transition-colors">Status</Link></li>
                                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p className="text-sm md:text-base">&copy; 2025 AthleteHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}