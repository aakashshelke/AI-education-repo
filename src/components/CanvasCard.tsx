import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import './styles.css'; // Ensure this path is correct
interface CanvasCardProps {
  id: string;
  title: string;
  description: string;
  className?: string;
  gradient: number;
}

export function CanvasCard({
  id,
  title,
  description,
  className,
  gradient,
}: CanvasCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const gradientClass = `canvas-card-gradient-${gradient || 1}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "canvas-card group",
        gradientClass,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/canvas/${id}`)}
    >
      <div className="p-8 h-[240px] flex flex-col justify-between">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <h3 className="text-2xl font-semibold tracking-tight text-black">{title}</h3>
          <p className="text-black">{description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0.7,
            scale: isHovered ? 1 : 0.95,
            y: isHovered ? 0 : 5
          }}
          transition={{ duration: 0.3 }}
          className="mt-auto"
        >
          <span className="inline-flex items-center justify-center rounded-md bg-white backdrop-sm px-3 py-1 text-sm font-medium text-black shadow-sm transition-all duration-200 group-hover:bg-white/20">
            Explore
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
