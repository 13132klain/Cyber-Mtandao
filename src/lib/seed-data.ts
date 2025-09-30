import { Service, ServiceCategory } from '@/types';

export const serviceCategories: Omit<ServiceCategory, 'id'>[] = [
  {
    name: 'Government Services',
    description: 'Official government document processing',
    icon: 'Building2',
    active: true,
    sortOrder: 1,
  },
  {
    name: 'Business Services',
    description: 'Business registration and compliance',
    icon: 'Briefcase',
    active: true,
    sortOrder: 2,
  },
  {
    name: 'Professional Services',
    description: 'CV writing and professional documents',
    icon: 'FileText',
    active: true,
    sortOrder: 3,
  },
  {
    name: 'Document Services',
    description: 'PDF editing and document formatting',
    icon: 'File',
    active: true,
    sortOrder: 4,
  },
];

export const services: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'KRA PIN Registration',
    description: 'Get your Kenya Revenue Authority Personal Identification Number (PIN) certificate. Required for tax compliance and official transactions.',
    category: 'Government Services',
    price: 300,
    estimatedTime: '1-2 business days',
    requirements: [
      'National ID copy (both sides)',
      'Passport photo',
      'Phone number',
      'Email address',
      'Physical address'
    ],
    active: true,
    imageUrl: '/images/services/kra-pin.jpg',
  },
  {
    title: 'NHIF Registration',
    description: 'Register for National Hospital Insurance Fund to access affordable healthcare services across Kenya.',
    category: 'Government Services',
    price: 250,
    estimatedTime: '2-3 business days',
    requirements: [
      'National ID copy',
      'Passport photo',
      'Employment details (if employed)',
      'Phone number',
      'Next of kin information'
    ],
    active: true,
    imageUrl: '/images/services/nhif.jpg',
  },
  {
    title: 'HELB Application',
    description: 'Apply for Higher Education Loans Board funding for university or college education.',
    category: 'Government Services',
    price: 400,
    estimatedTime: '3-5 business days',
    requirements: [
      'National ID copy',
      'KCSE certificate',
      'Admission letter',
      'Fee structure',
      'Parents/Guardian ID copies',
      'Income details'
    ],
    active: true,
    imageUrl: '/images/services/helb.jpg',
  },
  {
    title: 'Business Registration',
    description: 'Register your business name and get a business permit to operate legally in Kenya.',
    category: 'Business Services',
    price: 800,
    estimatedTime: '3-7 business days',
    requirements: [
      'Proposed business names (3 options)',
      'Owner ID copy',
      'Business location details',
      'Nature of business',
      'Capital amount'
    ],
    active: true,
    imageUrl: '/images/services/business-registration.jpg',
  },
  {
    title: 'Professional CV Writing',
    description: 'Get a professionally written CV that stands out to employers and increases your chances of landing interviews.',
    category: 'Professional Services',
    price: 500,
    estimatedTime: '1-2 business days',
    requirements: [
      'Current CV or resume',
      'Educational certificates',
      'Work experience details',
      'Skills and achievements',
      'Target job description (optional)'
    ],
    active: true,
    imageUrl: '/images/services/cv-writing.jpg',
  },
  {
    title: 'PDF Document Editing',
    description: 'Edit, format, and modify PDF documents including text changes, image insertion, and formatting.',
    category: 'Document Services',
    price: 200,
    estimatedTime: '1 business day',
    requirements: [
      'Original PDF document',
      'Specific editing requirements',
      'New content (if applicable)',
      'Preferred format specifications'
    ],
    active: true,
    imageUrl: '/images/services/pdf-editing.jpg',
  },
  {
    title: 'Good Conduct Certificate',
    description: 'Apply for a Certificate of Good Conduct from the Directorate of Criminal Investigations (DCI).',
    category: 'Government Services',
    price: 350,
    estimatedTime: '5-10 business days',
    requirements: [
      'National ID copy',
      'Passport photos (2)',
      'Fingerprints form',
      'Reason for application',
      'Application form'
    ],
    active: true,
    imageUrl: '/images/services/good-conduct.jpg',
  },
  {
    title: 'Company Registration',
    description: 'Register a limited company with the Registrar of Companies including memorandum and articles of association.',
    category: 'Business Services',
    price: 1500,
    estimatedTime: '5-14 business days',
    requirements: [
      'Proposed company names (3 options)',
      'Directors details and ID copies',
      'Shareholders information',
      'Registered office address',
      'Company objectives',
      'Share capital structure'
    ],
    active: true,
    imageUrl: '/images/services/company-registration.jpg',
  },
  {
    title: 'Cover Letter Writing',
    description: 'Professional cover letter writing service tailored to specific job applications.',
    category: 'Professional Services',
    price: 300,
    estimatedTime: '1 business day',
    requirements: [
      'Job description',
      'Current CV',
      'Company information',
      'Personal achievements',
      'Career objectives'
    ],
    active: true,
    imageUrl: '/images/services/cover-letter.jpg',
  },
  {
    title: 'Tax Returns Filing',
    description: 'Professional tax returns preparation and filing service for individuals and businesses.',
    category: 'Government Services',
    price: 600,
    estimatedTime: '2-3 business days',
    requirements: [
      'KRA PIN certificate',
      'Income statements',
      'Expense receipts',
      'Previous tax returns',
      'Bank statements'
    ],
    active: true,
    imageUrl: '/images/services/tax-returns.jpg',
  },
];

export const mockUsers = [
  {
    email: 'admin@cybermtandao.co.ke',
    name: 'System Administrator',
    phone: '+254700000001',
    role: 'admin' as const,
  },
  {
    email: 'staff@cybermtandao.co.ke',
    name: 'Staff Member',
    phone: '+254700000002',
    role: 'staff' as const,
  },
];

export const referralCodes = [
  {
    code: 'WELCOME10',
    userId: 'system',
    discountPercentage: 10,
    maxUses: 1000,
    currentUses: 0,
    active: true,
  },
  {
    code: 'NEWUSER15',
    userId: 'system', 
    discountPercentage: 15,
    maxUses: 500,
    currentUses: 0,
    active: true,
  },
];

export const sampleFormFields = {
  kraPin: [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'idNumber', label: 'National ID Number', type: 'text', required: true },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'county', label: 'County', type: 'text', required: true },
    { name: 'constituency', label: 'Constituency', type: 'text', required: true },
    { name: 'ward', label: 'Ward', type: 'text', required: true },
  ],
  nhif: [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'idNumber', label: 'National ID Number', type: 'text', required: true },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'employer', label: 'Employer (if employed)', type: 'text', required: false },
    { name: 'county', label: 'County', type: 'text', required: true },
  ],
  helb: [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'idNumber', label: 'National ID Number', type: 'text', required: true },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'institutionName', label: 'Institution Name', type: 'text', required: true },
    { name: 'courseOfStudy', label: 'Course of Study', type: 'text', required: true },
    { name: 'yearOfStudy', label: 'Year of Study', type: 'select', required: true, options: ['1', '2', '3', '4', '5', '6'] },
    { name: 'admissionNumber', label: 'Admission Number', type: 'text', required: true },
  ],
  cvWriting: [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', required: true },
    { name: 'profession', label: 'Current/Target Profession', type: 'text', required: true },
    { name: 'experience', label: 'Years of Experience', type: 'select', required: true, options: ['0-1', '2-5', '6-10', '10+'] },
    { name: 'education', label: 'Highest Education Level', type: 'text', required: true },
    { name: 'skills', label: 'Key Skills (comma separated)', type: 'textarea', required: true },
    { name: 'achievements', label: 'Key Achievements', type: 'textarea', required: true },
    { name: 'targetJob', label: 'Target Job Title (optional)', type: 'text', required: false },
  ],
};