import Header from '@/components/UI/header';
import Footer from '@/components/UI/footer';
import ContactForm from '@/components/contactUs/contactForm'
import NewsletterSignup from '@/components/newsletter/NewsletterSignup'
export default function Contact() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-red-500 to-blue-500 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <ContactForm />
      <NewsletterSignup />
      <Footer />
    </div>
  );
}