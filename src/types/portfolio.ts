export interface ProjectItem {
   id: string;
   slug: string;
   title: string;
   category: string;
   description: string;
   tags: string[];
   image?: string;
   objectPosition?: string;
   githubUrl?: string;
   demoUrl?: string;
   featured: boolean;
   year?: string;
   stars?: number;
   stats?: string;
}

export interface ExperienceItem {
   company: string;
   role: string;
   period: string;
   location: string;
   description: string[];
   technologies: string[];
   projectsInvolved?: string[];
}

export interface EducationItem {
   period: string;
   institution: string;
   degree: string;
   details?: string;
}

export interface CertificateItem {
   issuer: string;
   title: string;
   issueDate?: string;
   credentialId?: string;
   image?: string;
   badgeColor?: string;
}

export interface TechSkill {
   name: string;
   level?: string;
   iconName: string;
   color: string;
   bgLight: string;
}

export interface TechCategory {
   title: string;
   skills: TechSkill[];
}

export interface SocialLink {
   label: string;
   href: string;
   iconName: string;
   ariaLabel: string;
}
