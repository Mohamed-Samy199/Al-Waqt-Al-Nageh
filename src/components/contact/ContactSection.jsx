import Container from '../ui/Container';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

export default function ContactSection() {
  return (
    <section className="py-16 md:py-20">
      <Container className="grid gap-12 lg:grid-cols-[380px_1fr]">
        <ContactInfo />
        <ContactForm />
      </Container>
    </section>
  );
}
