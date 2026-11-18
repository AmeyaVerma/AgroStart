import { Smartphone, Sprout, Users, Store, GraduationCap } from 'lucide-react';

// Helpers for the catalogue: icon per category, plus duration and mode groups.
export const TOPIC_ICONS = {
  'Digital Agriculture': Smartphone,
  'Farm Practices': Sprout,
  'FPO Management': Users,
  'Agri-Entrepreneurship': Store,
  'Training of Trainers': GraduationCap,
};

export const durationGroup = (hours) => (hours <= 3 ? 'short' : hours <= 6 ? 'medium' : 'long');

// Framework filter "online / on-ground / blended"
export const modeGroup = (mode) => {
  if (mode === 'Digital') return 'online';
  if (mode === 'Classroom + Field') return 'ground';
  return 'blended';
};
