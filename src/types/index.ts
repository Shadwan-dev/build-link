// Tipos para el sistema de tenants
export interface TenantTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  darkColor: string;
  lightColor: string;
  logo?: string;
}

export interface TenantContact {
  phone: string;
  email: string;
  address: string;
  social?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface TenantSettings {
  language: string;
  currency: string;
  timezone?: string;
}

export interface Tenant {
  id: string;
  name: string;
  slogan?: string;
  description?: string;
  theme: TenantTheme;
  contact: TenantContact;
  features: string[];
  settings: TenantSettings;
}

// Tipos para componentes de UI
export interface NavItem {
  name: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export interface ServiceCard {
  icon: string;
  title: string;
  description: string;
  features: string[];
  color?: 'primary' | 'secondary' | 'accent';
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  client: string;
  results: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  project: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

// Props para componentes
export type ReactChildren = {
  children: React.ReactNode;
};

export type SectionProps = {
  className?: string;
  id?: string;
} & ReactChildren;
