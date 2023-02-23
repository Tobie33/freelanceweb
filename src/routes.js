import { Router } from 'express'
import authenticateUser from './_middlewares/authenticate-user.js'

const router = Router()

// API | AUTH
router.post('/api/auth/signup', (await import('./controllers/api/auth/signup.js')).default)
router.post('/api/auth/login', (await import('./controllers/api/auth/login.js')).default)
router.delete('/api/auth/logout', (await import('./controllers/api/auth/logout.js')).default)

// API | MY PROFILE
router.get('/api/my/profile', authenticateUser('json'), (await import('./controllers/api/my/profile/show.js')).default)

// API | MY CONVERSATIONS
router.post('/api/my/conversations', authenticateUser('json'), (await import('./controllers/api/my/conversations/create.js')).default)
router.get('/api/my/conversations', authenticateUser('json'), (await import('./controllers/api/my/conversations/index.js')).default)

// API | USERS
router.get('/api/users', (await import('./controllers/api/users/index-users.js')).default)
router.get('/api/users/:id', (await import('./controllers/api/users/show-user.js')).default)

// API | CATEGORIES
router.get('/api/categories', (await import('./controllers/api/categories/index-categories.js')).default)
router.get('/api/categories/:id', (await import('./controllers/api/categories/show-category.js')).default)

// API | NOT FOUND
router.use('/api', (await import('./controllers/api/not-found/not-found.js')).default)

// PAGES | AUTH
router.get('/auth/login', (await import('./controllers/pages/auth/login.js')).default)
router.get('/auth/signup', (await import('./controllers/pages/auth/signup.js')).default)

// PAGES | STATIC
router.get('/', (await import('./controllers/pages/static/home.js')).default)

// PAGES| USERS
router.get('/users', (await import('./controllers/pages/user/index.js')).default)

export default router
