import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Smartphone, MapPin, Star, Zap, DollarSign, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

const WelcoLanding = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t, isLoading: languageLoading } = useLanguage();

  const handleWaitlistSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: t('invalid_email'),
        description: t('invalid_email_description'),
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: t('already_registered'),
            description: t('already_registered_description'),
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: t('welcome_to_welco'),
          description: t('welcome_description')
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Waitlist signup error:', error);
      toast({
        title: t('something_wrong'),
        description: t('try_again'),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (languageLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl font-bold text-[#1a2444]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-[#1a2444]" style={{fontFamily: 'Labil Grotesk, Inter, sans-serif'}}>
            {t('company_name')}
          </div>
          <Button 
            onClick={() => document.getElementById('signup')?.scrollIntoView({behavior: 'smooth'})}
            className="bg-[#f59e0b] hover:bg-[#d97706] text-white px-6 py-2"
          >
            {t('get_early_access')}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <h1 className="text-4xl lg:text-5xl font-bold text-[#1a2444] leading-tight mb-6" style={{fontFamily: 'Labil Grotesk, Inter, sans-serif'}}>
                {t('hero_title')}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {t('hero_subtitle')}
              </p>
              <Button 
                onClick={() => document.getElementById('signup')?.scrollIntoView({behavior: 'smooth'})}
                className="bg-[#f59e0b] hover:bg-[#d97706] text-white text-lg px-8 py-4 mb-4"
              >
                {t('join_waitlist')}
              </Button>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm mx-auto">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-[#25d366] rounded-full flex items-center justify-center mr-3">
                    <Smartphone className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold">WhatsApp Business</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#e7f3ff] p-3 rounded-lg">
                    <p className="text-sm">Hello! The coffee machine isn't working properly</p>
                  </div>
                  <div className="bg-[#f0fdf4] p-3 rounded-lg ml-8">
                    <p className="text-sm">I can help with that! First, check if the water tank is properly seated...</p>
                  </div>
                  <div className="bg-[#e7f3ff] p-3 rounded-lg">
                    <p className="text-sm">That worked! Any good restaurants nearby?</p>
                  </div>
                  <div className="bg-[#f0fdf4] p-3 rounded-lg ml-8">
                    <p className="text-sm">I recommend Casa Romaneasca (5 min walk) - traditional cuisine, 4.8★ rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2444] mb-12" style={{fontFamily: 'Labil Grotesk, Inter, sans-serif'}}>
            {t('stop_losing_sleep')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="h-12 w-12 text-[#f59e0b] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1a2444] mb-2">{t('hours_weekly')}</h3>
              <p className="text-gray-600">{t('hours_description')}</p>
            </div>
            <div className="text-center">
              <DollarSign className="h-12 w-12 text-[#f59e0b] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1a2444] mb-2">{t('missed_revenue')}</h3>
              <p className="text-gray-600">{t('missed_revenue_description')}</p>
            </div>
            <div className="text-center">
              <Star className="h-12 w-12 text-[#f59e0b] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1a2444] mb-2">{t('rating_anxiety')}</h3>
              <p className="text-gray-600">{t('rating_anxiety_description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2444] text-center mb-14" style={{fontFamily: 'Labil Grotesk, Inter, sans-serif'}}>
            {t('meet_expert')}
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <Zap className="h-12 w-12 text-[#f59e0b] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#1a2444] mb-4">{t('instant_support')}</h3>
                <p className="text-gray-600 mb-6">{t('instant_support_description')}</p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 italic">{t('instant_support_example')}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <MapPin className="h-12 w-12 text-[#f59e0b] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#1a2444] mb-4">{t('local_expert')}</h3>
                <p className="text-gray-600 mb-6">{t('local_expert_description')}</p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 italic">{t('local_expert_example')}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <Star className="h-12 w-12 text-[#f59e0b] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#1a2444] mb-4">{t('perfect_hosting')}</h3>
                <p className="text-gray-600 mb-6">{t('perfect_hosting_description')}</p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 italic">{t('perfect_hosting_example')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Revenue Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2444] mb-8" style={{fontFamily: 'Labil Grotesk, Inter, sans-serif'}}>
            {t('technology_pays_back')}
          </h2>
          <div className="bg-[#f8fafc] rounded-2xl p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-4 items-center">
              <div className="text-center">
                <p className="text-lg text-gray-600">{t('monthly_cost')}</p>
                <p className="text-2xl font-bold text-[#1a2444]">€12-20</p>
              </div>
              <div className="text-center">
                <div className="text-4xl text-[#f59e0b]">→</div>
              </div>
              <div className="text-center">
                <p className="text-lg text-gray-600">{t('potential_earnings')}</p>
                <p className="text-3xl font-bold text-[#f59e0b]">€51-105</p>
              </div>
            </div>
          </div>
          <p className="text-lg text-gray-600">
            {t('revenue_share_description')}
          </p>
        </div>
      </section>

      {/* Pricing Section - Hidden but kept in code */}
      <section className="py-20 bg-white hidden">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2444] text-center mb-12" style={{fontFamily: 'Labil Grotesk, Inter, sans-serif'}}>
            Simple, Transparent Pricing
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-2 border-gray-200 hover:border-[#f59e0b] transition-colors">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-[#1a2444] mb-2">Smaller Cities</h3>
                <div className="text-4xl font-bold text-[#1a2444] mb-4">€12<span className="text-lg text-gray-500">/month</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-[#f59e0b] mr-2" />
                    <span>24/7 WhatsApp AI</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-[#f59e0b] mr-2" />
                    <span>Appliance support</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-[#f59e0b] mr-2" />
                    <span>Local recommendations</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-[#f59e0b] mr-2" />
                    <span>5% revenue share</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-[#f59e0b] relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#f59e0b] text-white px-4 py-1 rounded-full text-sm font-bold">
                  RECOMMENDED
                </span>
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-[#1a2444] mb-2">Major Cities</h3>
                <div className="text-4xl font-bold text-[#1a2444] mb-4">€16<span className="text-lg text-gray-500">/month</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-[#f59e0b] mr-2" />
                    <span>24/7 WhatsApp AI</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-[#f59e0b] mr-2" />
                    <span>Appliance support</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-[#f59e0b] mr-2" />
                    <span>Premium local network</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-[#f59e0b] mr-2" />
                    <span>7% revenue share</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-gray-200 hover:border-[#f59e0b] transition-colors">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-[#1a2444] mb-2">Bucharest & Premium</h3>
                <div className="text-4xl font-bold text-[#1a2444] mb-4">€20<span className="text-lg text-gray-500">/month</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-[#f59e0b] mr-2" />
                    <span>24/7 WhatsApp AI</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-[#f59e0b] mr-2" />
                    <span>Premium appliance support</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-[#f59e0b] mr-2" />
                    <span>Exclusive partnerships</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-[#f59e0b] mr-2" />
                    <span>10% revenue share</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="signup" className="py-24 bg-[#1a2444]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6" style={{fontFamily: 'Labil Grotesk, Inter, sans-serif'}}>
            {t('ready_legendary_host')}
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            {t('join_waitlist_early_access')}
          </p>
          <form onSubmit={handleWaitlistSignup} className="flex flex-col sm:flex-row gap-4 mb-4">
            <Input
              type="email"
              placeholder={t('enter_email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white border-0 text-gray-900 placeholder-gray-500"
              required
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-[#f59e0b] hover:bg-[#d97706] text-[#1a2444] font-bold px-8 py-3"
            >
              {isLoading ? t('joining') : t('join_waitlist')}
            </Button>
          </form>
          <p className="text-sm text-gray-400">
            {t('no_spam')}
          </p>
        </div>
      </section>

      {/* Social Proof Section - Moved below signup */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1a2444] text-center mb-12" style={{fontFamily: 'Labil Grotesk, Inter, sans-serif'}}>
            {t('join_owners_succeeding')}
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4 italic">
                  {t('testimonial1')}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#f59e0b] rounded-full flex items-center justify-center text-white font-bold mr-3">
                    AM
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a2444]">{t('testimonial1_name')}</p>
                    <p className="text-sm text-gray-500">{t('testimonial1_location')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4 italic">
                  {t('testimonial2')}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#f59e0b] rounded-full flex items-center justify-center text-white font-bold mr-3">
                    MI
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a2444]">{t('testimonial2_name')}</p>
                    <p className="text-sm text-gray-500">{t('testimonial2_location')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4 italic">
                  {t('testimonial3')}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#f59e0b] rounded-full flex items-center justify-center text-white font-bold mr-3">
                    EP
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a2444]">{t('testimonial3_name')}</p>
                    <p className="text-sm text-gray-500">{t('testimonial3_location')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#374151]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold text-white mb-4 md:mb-0" style={{fontFamily: 'Labil Grotesk, Inter, sans-serif'}}>
              {t('company_name')}
            </div>
            <div className="text-gray-300 mb-4 md:mb-0">
              {t('building_future')}
            </div>
            <div className="text-gray-300">
              contact@welco.ro
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcoLanding;
