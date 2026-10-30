// SAMPLE DATA ONLY. Replace with the real course list once AgroStart confirms the pilot
// courses, languages and pricing (brief, sections 6.1 and 16).
// Filter values stay in English here; on-screen labels come from the dictionaries
// ("opt.*"), and each course's title, blurb, outcomes (o1, o2) and modules (m1 to m3)
// from "courses.<id>.*". `audience` lists who the course suits (labels: "aud.<id>").
export const COURSES = [
  { id: 'smartphone-farming', topic: 'Digital Agriculture', level: 'Beginner', hours: 2, languages: ['Odia', 'Hindi', 'English'], mode: 'Digital', price: 'Free', audience: ['young', 'women', 'youth'] },
  { id: 'soil-health', topic: 'Farm Practices', level: 'Beginner', hours: 3, languages: ['Odia', 'Hindi', 'English'], mode: 'Digital + Field', price: 'Free', audience: ['young', 'women'] },
  { id: 'fpo-governance', topic: 'FPO Management', level: 'Intermediate', hours: 6, languages: ['Hindi', 'English'], mode: 'Digital + Classroom', price: 'Paid', audience: ['fpo'] },
  { id: 'agri-enterprise', topic: 'Agri-Entrepreneurship', level: 'Intermediate', hours: 8, languages: ['Odia', 'English'], mode: 'Digital + Classroom', price: 'Paid', audience: ['agri', 'youth'] },
  { id: 'trainer-skills', topic: 'Training of Trainers', level: 'Advanced', hours: 10, languages: ['Hindi', 'English'], mode: 'Classroom + Field', price: 'Paid', audience: ['staff', 'fpo'] },
  { id: 'safe-input-use', topic: 'Farm Practices', level: 'Beginner', hours: 2, languages: ['Odia', 'Hindi'], mode: 'Digital + Field', price: 'Free', audience: ['young', 'staff'] },
];

export const FEATURED_COURSE_IDS = ['smartphone-farming', 'soil-health', 'agri-enterprise'];

export const getCourse = (id) => COURSES.find((c) => c.id === id);
