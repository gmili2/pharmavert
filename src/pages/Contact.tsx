import { ContactBlock } from '../components/Sections';
import { useTitle } from '../seo';

export default function Contact() {
  useTitle('Contact · Pharma Vert');
  return (
    <div className="page-top">
      <ContactBlock headingLevel={1} />
    </div>
  );
}
