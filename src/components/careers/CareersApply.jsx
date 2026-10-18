import { motion } from 'framer-motion';
import Container from '../ui/Container';
import CareersContactCard from './CareersContactCard';
import CareersApplyForm from './CareersApplyForm';

export default function CareersApply({ position, onPositionChange }) {
  return (
    <section id="apply" className="scroll-mt-24 bg-white py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Heading + direct contact */}
          <CareersContactCard />

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm sm:p-8"
          >
            <CareersApplyForm position={position} onPositionChange={onPositionChange} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
