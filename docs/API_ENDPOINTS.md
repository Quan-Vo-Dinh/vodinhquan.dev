# Portfolio API Endpoints Documentation

This document outlines all the REST API endpoints that need to be implemented for the portfolio backend integration.

## Base URL

```
https://your-api-domain.com/api
```

## Authentication

Most endpoints require JWT authentication via Bearer token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

---

## User Management

### Get User Profile

- **GET** `/user`
- **Auth**: Required
- **Description**: Get current user profile information
- **Response**:

```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "avatar": "string (URL)",
    "title": "string",
    "location": "string",
    "bio": "string",
    "cvUrl": "string (URL)",
    "isActive": true,
    "createdAt": "ISO string",
    "updatedAt": "ISO string"
  }
}
```

### Update User Profile

- **PUT** `/user`
- **Auth**: Required
- **Body**:

```json
{
  "name": "string (optional)",
  "title": "string (optional)",
  "location": "string (optional)",
  "bio": "string (optional)"
}
```

---

## Social Links Management

### Get Social Links

- **GET** `/user/social-links`
- **Auth**: Required
- **Query Params**:
  - `visible` (boolean, optional): Filter by visibility
- **Response**: Array of social links

### Create Social Link

- **POST** `/user/social-links`
- **Auth**: Required
- **Body**:

```json
{
  "platform": "linkedin|github|instagram|twitter|facebook|other",
  "url": "string",
  "username": "string (optional)",
  "isVisible": true,
  "order": 1
}
```

### Update Social Link

- **PUT** `/user/social-links/:id`
- **Auth**: Required
- **Body**: Partial social link object

### Delete Social Link

- **DELETE** `/user/social-links/:id`
- **Auth**: Required

### Reorder Social Links

- **PATCH** `/user/social-links/reorder`
- **Auth**: Required
- **Body**:

```json
{
  "items": [
    { "id": "string", "order": 1 },
    { "id": "string", "order": 2 }
  ]
}
```

---

## Tech Stack Management

### Get Tech Stack

- **GET** `/user/tech-stack`
- **Auth**: Required
- **Query Params**:
  - `category` (string, optional): Filter by category
  - `visible` (boolean, optional): Filter by visibility

### Create Tech Stack Item

- **POST** `/user/tech-stack`
- **Auth**: Required
- **Body**:

```json
{
  "name": "string",
  "category": "frontend|backend|database|devops|design|other",
  "iconName": "string",
  "proficiencyLevel": 1-5,
  "yearsOfExperience": "number (optional)",
  "isVisible": true,
  "order": 1
}
```

### Update Tech Stack Item

- **PUT** `/user/tech-stack/:id`
- **Auth**: Required

### Delete Tech Stack Item

- **DELETE** `/user/tech-stack/:id`
- **Auth**: Required

### Reorder Tech Stack

- **PATCH** `/user/tech-stack/reorder`
- **Auth**: Required

---

## Skills Management

### Get Skills

- **GET** `/user/skills`
- **Auth**: Required
- **Query Params**:
  - `category` (string, optional): Filter by category
  - `visible` (boolean, optional): Filter by visibility

### Create Skill

- **POST** `/user/skills`
- **Auth**: Required
- **Body**:

```json
{
  "title": "string",
  "description": "string (optional)",
  "category": "technical|soft|language|other",
  "proficiencyLevel": 1-5,
  "isVisible": true,
  "order": 1
}
```

### Update Skill

- **PUT** `/user/skills/:id`
- **Auth**: Required

### Delete Skill

- **DELETE** `/user/skills/:id`
- **Auth**: Required

### Reorder Skills

- **PATCH** `/user/skills/reorder`
- **Auth**: Required

---

## Projects Management

### Get Projects

- **GET** `/projects`
- **Auth**: Optional (public projects only if not authenticated)
- **Query Params**:
  - `page` (number, default: 1)
  - `limit` (number, default: 10)
  - `featured` (boolean, optional)
  - `visible` (boolean, optional)
  - `status` (string, optional): completed|in-progress|planned|archived
  - `search` (string, optional): Search in title and description

### Get Single Project

- **GET** `/projects/:id`
- **Auth**: Optional

### Create Project

- **POST** `/projects`
- **Auth**: Required
- **Body**:

```json
{
  "title": "string",
  "description": "string",
  "shortDescription": "string (optional)",
  "technologies": ["string"],
  "githubUrl": "string (optional)",
  "liveUrl": "string (optional)",
  "status": "completed|in-progress|planned|archived",
  "featured": false,
  "startDate": "ISO string",
  "endDate": "ISO string (optional)",
  "teamSize": "number (optional)",
  "myRole": "string (optional)",
  "challenges": "string (optional)",
  "learnings": "string (optional)"
}
```

### Update Project

- **PUT** `/projects/:id`
- **Auth**: Required

### Delete Project

- **DELETE** `/projects/:id`
- **Auth**: Required

### Toggle Project Featured

- **PATCH** `/projects/:id/toggle-featured`
- **Auth**: Required

### Toggle Project Visibility

- **PATCH** `/projects/:id/toggle-visibility`
- **Auth**: Required

### Reorder Projects

- **PATCH** `/projects/reorder`
- **Auth**: Required

---

## Experience Management

### Get Experiences

- **GET** `/experiences`
- **Auth**: Optional
- **Query Params**:
  - `page` (number, default: 1)
  - `limit` (number, default: 10)
  - `visible` (boolean, optional)
  - `type` (string, optional): full-time|part-time|contract|internship|freelance

### Get Single Experience

- **GET** `/experiences/:id`
- **Auth**: Optional

### Create Experience

- **POST** `/experiences`
- **Auth**: Required
- **Body**:

```json
{
  "company": "string",
  "position": "string",
  "description": "string",
  "responsibilities": ["string"],
  "achievements": ["string"] (optional),
  "technologies": ["string"],
  "type": "full-time|part-time|contract|internship|freelance",
  "location": "string",
  "locationType": "onsite|remote|hybrid",
  "startDate": "ISO string",
  "endDate": "ISO string (optional)",
  "isCurrentJob": false,
  "companyLogo": "string (optional)",
  "companyWebsite": "string (optional)",
  "isVisible": true,
  "order": 1
}
```

### Update Experience

- **PUT** `/experiences/:id`
- **Auth**: Required

### Delete Experience

- **DELETE** `/experiences/:id`
- **Auth**: Required

### Toggle Experience Visibility

- **PATCH** `/experiences/:id/toggle-visibility`
- **Auth**: Required

### Reorder Experiences

- **PATCH** `/experiences/reorder`
- **Auth**: Required

---

## Education Management

### Get Education

- **GET** `/education`
- **Auth**: Optional
- **Query Params**:
  - `page` (number, default: 1)
  - `limit` (number, default: 10)
  - `visible` (boolean, optional)

### Get Single Education

- **GET** `/education/:id`
- **Auth**: Optional

### Create Education

- **POST** `/education`
- **Auth**: Required
- **Body**:

```json
{
  "institution": "string",
  "degree": "string",
  "field": "string",
  "description": "string (optional)",
  "grade": "string (optional)",
  "gpa": "number (optional)",
  "maxGpa": "number (optional)",
  "activities": ["string"] (optional),
  "relevantCourses": ["string"] (optional),
  "startDate": "ISO string",
  "endDate": "ISO string (optional)",
  "isCurrentStudy": false,
  "institutionLogo": "string (optional)",
  "institutionWebsite": "string (optional)",
  "location": "string",
  "isVisible": true,
  "order": 1
}
```

### Update Education

- **PUT** `/education/:id`
- **Auth**: Required

### Delete Education

- **DELETE** `/education/:id`
- **Auth**: Required

### Toggle Education Visibility

- **PATCH** `/education/:id/toggle-visibility`
- **Auth**: Required

### Reorder Education

- **PATCH** `/education/reorder`
- **Auth**: Required

---

## Memories Management

### Get Memories

- **GET** `/memories`
- **Auth**: Optional
- **Query Params**:
  - `page` (number, default: 1)
  - `limit` (number, default: 10)
  - `visible` (boolean, optional)
  - `featured` (boolean, optional)
  - `tag` (string, optional): Filter by tag
  - `mood` (string, optional): Filter by mood

### Get Single Memory

- **GET** `/memories/:id`
- **Auth**: Optional

### Create Memory

- **POST** `/memories`
- **Auth**: Required
- **Body**:

```json
{
  "title": "string",
  "description": "string",
  "date": "ISO string",
  "tags": ["string"],
  "location": "string (optional)",
  "mood": "happy|excited|proud|grateful|nostalgic|other (optional)",
  "isVisible": true,
  "isFeatured": false,
  "order": 1
}
```

### Update Memory

- **PUT** `/memories/:id`
- **Auth**: Required

### Delete Memory

- **DELETE** `/memories/:id`
- **Auth**: Required

### Toggle Memory Featured

- **PATCH** `/memories/:id/toggle-featured`
- **Auth**: Required

### Toggle Memory Visibility

- **PATCH** `/memories/:id/toggle-visibility`
- **Auth**: Required

### Reorder Memories

- **PATCH** `/memories/reorder`
- **Auth**: Required

---

## Contact Management

### Send Contact Message

- **POST** `/contact`
- **Auth**: Not required
- **Body**:

```json
{
  "name": "string",
  "email": "string",
  "subject": "string (optional)",
  "message": "string"
}
```

### Get Contact Messages (Admin)

- **GET** `/contact/messages`
- **Auth**: Required (Admin)
- **Query Params**:
  - `page` (number, default: 1)
  - `limit` (number, default: 10)
  - `status` (string, optional): unread|read|replied|archived

### Get Single Contact Message (Admin)

- **GET** `/contact/messages/:id`
- **Auth**: Required (Admin)

### Update Message Status (Admin)

- **PATCH** `/contact/messages/:id/status`
- **Auth**: Required (Admin)
- **Body**:

```json
{
  "status": "unread|read|replied|archived"
}
```

### Delete Contact Message (Admin)

- **DELETE** `/contact/messages/:id`
- **Auth**: Required (Admin)

---

## Settings Management

### Get Portfolio Settings

- **GET** `/settings`
- **Auth**: Required
- **Response**:

```json
{
  "success": true,
  "data": {
    "id": "string",
    "theme": "light|dark|auto",
    "primaryColor": "string",
    "secondaryColor": "string",
    "accentColor": "string",
    "showNavigation": true,
    "showSidebar": true,
    "enableAnimations": true,
    "enableParticles": false,
    "socialLinksPosition": "sidebar|footer|both",
    "seoTitle": "string",
    "seoDescription": "string",
    "seoKeywords": ["string"],
    "googleAnalyticsId": "string (optional)",
    "isMaintenanceMode": false,
    "customCss": "string (optional)",
    "customJs": "string (optional)",
    "updatedAt": "ISO string"
  }
}
```

### Update Portfolio Settings

- **PUT** `/settings`
- **Auth**: Required
- **Body**: Partial settings object

### Get Navigation Items

- **GET** `/navigation`
- **Auth**: Optional
- **Response**: Array of navigation items

### Update Navigation Items

- **PUT** `/navigation`
- **Auth**: Required
- **Body**:

```json
{
  "items": [
    {
      "id": "string",
      "name": "string",
      "slug": "string",
      "icon": "string (optional)",
      "isVisible": true,
      "order": 1,
      "isExternal": false,
      "url": "string (optional)"
    }
  ]
}
```

### Reorder Navigation Items

- **PATCH** `/navigation/reorder`
- **Auth**: Required

---

## File Upload

### Upload Single File

- **POST** `/upload`
- **Auth**: Required
- **Content-Type**: `multipart/form-data`
- **Body**:
  - `file`: File
  - `type`: avatar|cv|project|memory
- **Response**:

```json
{
  "success": true,
  "data": {
    "url": "string"
  }
}
```

### Upload Multiple Files

- **POST** `/upload/multiple`
- **Auth**: Required
- **Content-Type**: `multipart/form-data`
- **Body**:
  - `files`: File[]
  - `type`: project|memory
- **Response**:

```json
{
  "success": true,
  "data": {
    "urls": ["string"]
  }
}
```

### Upload Avatar

- **POST** `/upload/avatar`
- **Auth**: Required
- **Content-Type**: `multipart/form-data`
- **Body**:
  - `avatar`: File

### Upload CV

- **POST** `/upload/cv`
- **Auth**: Required
- **Content-Type**: `multipart/form-data`
- **Body**:
  - `cv`: File

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE (optional)"
}
```

Common HTTP Status Codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `422`: Validation Error
- `500`: Internal Server Error

---

## Rate Limiting

- Contact form: 5 requests per hour per IP
- File uploads: 20 requests per hour per user
- Other endpoints: 1000 requests per hour per user

---

## Pagination Response Format

For paginated endpoints:

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```
