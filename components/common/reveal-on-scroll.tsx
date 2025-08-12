import { useInView } from 'react-intersection-observer';
import { MotionDiv } from './motion-wrapper';

type Props = {
    children: React.ReactNode;
    delay?: number;
};

export default function RevealOnScroll({ children, delay = 0 }: Props) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2, // Trigger when 20% visible
    });

    return (
        <MotionDiv
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
        >
            {children}
        </MotionDiv>
    );
}
