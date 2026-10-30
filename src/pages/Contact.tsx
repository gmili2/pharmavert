import { ContactBlock } from '../components/Sections';
import { useSeo } from '../seo';

export default function Contact() {
  useSeo({
    title: 'Contact : téléphone, WhatsApp et e-mail | Pharma Vert',
    description: 'Contactez Pharma Vert au 06 61 70 67 39 ou sur WhatsApp, du lundi au samedi de 9h à 18h. E-mail : contact@pharmavert.ma.',
    path: '/contact'
  });
  return (
    <div className="page-top">
      <ContactBlock headingLevel={1} />
    </div>
  );
}
