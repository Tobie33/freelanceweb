import Client from '@prisma/client'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

const prisma = new Client.PrismaClient()

const createList = async () => {
  const list = [
    {
      categoryName: 'Computer and IT',
      roles: [
        'Computer systems manager',
        'Network architect',
        'Systems analyst',
        'IT coordinator',
        'Network administrator',
        'Network engineer',
        'Service desk analyst',
        'System administrator (also known as sysadmin)',
        'Wireless network engineer',
        'Database administrator',
        'Database analyst',
        'Data quality manager',
        'Database report writer',
        'SQL database administrator',
        'Big data engineer/architect',
        'Business intelligence specialist/analyst',
        'Business systems analyst',
        'Data analyst',
        'Data analytics developer',
        'Data modeling analyst',
        'Data scientist',
        'Data warehouse manager',
        'Data warehouse programming specialist',
        'Intelligence specialist',
        'Back-end developer',
        'Cloud/software architect',
        'Cloud/software developer',
        'Cloud/software applications engineer',
        'Cloud system administrator',
        'Cloud system engineer',
        'DevOps engineer',
        'Front-end developer',
        'Full-stack developer',
        'Java developer',
        'Platform engineer',
        'Release manager',
        'Reliability engineer',
        'Software engineer',
        'Software quality assurance analyst',
        'UI (user interface) designer',
        'UX (user experience) designer',
        'Web developer',
        'Application security administrator',
        'Artificial intelligence security specialist',
        'Cloud security specialist',
        'Cybersecurity hardware engineer',
        'Cyberintelligence specialist',
        'Cryptographer',
        'Data privacy officer',
        'Digital forensics analyst',
        'IT security engineer',
        'Information assurance analyst',
        'Security systems administrator',
        'Help desk support specialist',
        'IT support specialist',
        'Customer service representative',
        'Technical product manager',
        'Product manager',
        'Program manager',
        'Project manager',
        'Portfolio manager'
      ]
    }, {
      categoryName: 'Administrative',
      roles: [
        'Office Assistant',
        'Administrative Assistant',
        'Data Entry Clerk',
        'Receptionist',
        'Office Administrator',
        'Events Administrator',
        'Operations Manager',
        'Executive Assistant',
        'Facilities Manager',
        'Office Manager',
        'Administrative Technician',
        'Service Administrator',
        'Administrative Services Manager',
        'Business Administrator',
        'Staff Assistant',
        'Front Desk Supervisor',
        'Senior Administrative Analyst',
        'Chief Administrative Officer',
        'Senior Executive Assistant',
        'Community Liaison',
        'Senior Personal Assistant',
        'Chief People Officer',
        'Chief Operating Officer',
        'Director of Operations',
        'Vice President of Administration'
      ]
    }, {
      categoryName: 'Accounting and finance',
      roles: [
        'Accounting manager',
        'Accounting officer',
        'Business analyst',
        'General accountant',
        'CPA',
        'Accounting supervisor',
        'Project accountant',
        'Staff accountant',
        'Cost accountant',
        'Bookkeeper',
        'Finance clerk',
        'Administrative assistant',
        'Accounting secretary',
        'Trust officer',
        'Equity research analyst',
        'Planning analyst',
        'Real estate analyst',
        'Credit products officer',
        'Investment analyst',
        'Securities analyst'
      ]
    }, {
      categoryName: 'Customer service',
      roles: [
        'Customer Service Manager',
        'Customer Success Manager',
        'Call Center Supervisor',
        'Relationship Manager',
        'Client Services Manager',
        'Client Care Manager',
        'Customer Support Manager',
        'Customer Care Manager',
        'Guest Services Manager',
        'Customer Service Representative',
        'Call Center Representative',
        'Implementation Specialist',
        'Customer Service Agent',
        'Implementation Consultant',
        'Customer Care Representative',
        'Support Specialist',
        'Customer Advocate',
        'Customer Service Specialist',
        'Client Service Associate',
        'Client Service Representative'
      ]
    }, {
      categoryName: 'Software development',
      roles: [
        ' Front-End Engineer',
        ' Back-End Engineer',
        ' Full Stack Engineer',
        ' Software Engineer in Test (QA Engineer)',
        ' Software Development Engineer in Test (SDET)',
        ' DevOps Engineer',
        ' Security Engineer',
        ' Data Engineer',
        ' Cloud Architect'
      ]
    }, {
      categoryName: 'Medical and health',
      roles: [
        'Home Health Aide',
        'Medical Assistant',
        'Nursing Assistant',
        'Physical Therapy Assistant',
        'Licensed Practical Nurse',
        'Registered Nurse',
        'Occupational Therapist',
        'Physical Therapist',
        'Physician Assistant',
        'Nurse Practitioner',
        'Surgeon',
        'Veterinarian',
        'Pediatrician',
        'Optometrist',
        'Medical surgery nurse',
        'Chiropractor',
        'Psychiatrist',
        'Podiatrist',
        'Physician',
        'Oncologist',
        'Dentist'
      ]
    }, {
      categoryName: 'Project management',
      roles: [
        'Project Manager',
        'Senior Project Manager',
        'Director of Project Manager',
        'Project Coordinator',
        'Project Scheduler',
        'Team Leader'
      ]
    }, {
      categoryName: 'Research analyst',
      roles: [
        'Market Research Analyst (Marketing)',
        'Operations Research Analyst',
        'Economic Research analyst',
        'Financial Analyst',
        'Equity Research Analyst'
      ]
    }, {
      categoryName: 'Writing',
      roles: [
        'Author',
        'Blogger',
        'Book coach',
        'Commissioning editor',
        'Copy editor',
        'Creative consultant',
        'Dog writer',
        'Freelancer',
        'Ghostwriter',
        'Griot',
        'Hack writer',
        'Infopreneur',
        'Investigative Journalist',
        'Journalist',
        'Literary editor',
        'Manuscript format',
        'Medical writing',
        'Novelist',
        'Poet',
        'Polygraph (author)',
        'Review',
        'Screenwriter',
        'Scribe',
        'Script coordinator',
        'Script doctor',
        'Scrivener',
        'Songwriter',
        'Speechwriter',
        'Staff writer',
        'Technical writer',
        'Website content writer',
        'Writer'
      ]
    }, {
      categoryName: 'Education and training',
      roles: [
        'Academic Advisor',
        'School Counsellor',
        'Intervention Specialist',
        'Tutor',
        'Curriculum Manager',
        'School Psychologist',
        'Speech Therapist'
      ]
    }
  ]

  await prisma.role.deleteMany()
  await prisma.category.deleteMany()

  await Promise.all(list.map((catData) => prisma.category.create({
    data: {
      ...catData,
      roles: {
        create: catData.roles.map((role) => ({ roleName: role }))
      }
    }
  })))
}

const generateRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const createUser = async () => {
  await prisma.user.deleteMany()

  const categories = await prisma.category.findMany({ include: { roles: true } })
  const passwordHash = await bcrypt.hash('123456', 10)
  await Promise.all(Array(10).fill(null).map(() => {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const role = category.roles[Math.floor(Math.random() * category.roles.length)]
    const age = generateRandomInteger(20, 60)
    const experience = generateRandomInteger(0, Math.floor(age - 16))
    return prisma.user.create({
      data: {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        age,
        experience,
        price: Number(faker.random.numeric(3)),
        description: faker.random.words(10),
        lookingForWork: faker.datatype.boolean(),
        passwordHash,
        categories: {
          connect: [{ id: category.id }]
        },
        roles: {
          connect: { id: role.id }
        }
      }
    })
  }))
}

const init = async () => {
  await createList()
  await createUser()
}

init()

export default prisma
