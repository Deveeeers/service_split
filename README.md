# 💰 Splitwise Application API Documentation

A comprehensive expense splitting application that allows users to manage shared expenses in groups and track balances between individuals.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL/MySQL database
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd service_split

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run the application
npm start
```

## 🔗 Base URL
```
http://localhost:3000
```

---

## 📚 API Endpoints

### 🏠 **User Management APIs**

#### 1. Create User
Create a new user account.

**Endpoint:** `POST /user`

**CURL Example:**
```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "address": "123 Main St, City, State",
    "contact_number": "+1234567890"
  }'
```

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "address": "string (optional)",
  "contact_number": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user_id": "user_ulid_here",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

#### 2. Update User
Update user information.

**Endpoint:** `PUT /user/:id`

**CURL Example:**
```bash
curl -X PUT http://localhost:3000/user/01HXXX1234567890ABCDEF \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "contact_number": "+1987654321"
  }'
```

#### 3. Delete User
Delete a user account.

**Endpoint:** `DELETE /user/:id`

**CURL Example:**
```bash
curl -X DELETE http://localhost:3000/user/01HXXX1234567890ABCDEF
```

---

### 👥 **Group Management APIs**

#### 1. Create Group
Create a new expense group.

**Endpoint:** `POST /group/create`

**CURL Example:**
```bash
curl -X POST http://localhost:3000/group/create \
  -H "Content-Type: application/json" \
  -H "user_id: 01HXXX1234567890ABCDEF" \
  -d '{
    "group_name": "Vacation Trip 2024",
    "desc": "Expenses for our annual vacation trip",
    "user_ids": ["01HXXX1234567890ABCDEF", "01HYYY1234567890ABCDEF"]
  }'
```

**Request Headers:**
```
user_id: string (required)
```

**Request Body:**
```json
{
  "group_name": "string (required, min 3 chars)",
  "desc": "string (required)",
  "user_ids": ["array of user IDs (required, min 1)"]
}
```

#### 2. Add User to Group
Add a new user to an existing group.

**Endpoint:** `POST /group/user/add`

**CURL Example:**
```bash
curl -X POST http://localhost:3000/group/user/add \
  -H "Content-Type: application/json" \
  -H "user_id: 01HXXX1234567890ABCDEF" \
  -d '{
    "new_user_id": "01HZZZ1234567890ABCDEF",
    "group_id": "01HGGG1234567890ABCDEF"
  }'
```

#### 3. Remove User from Group
Remove a user from a group.

**Endpoint:** `DELETE /group/user/delete`

**CURL Example:**
```bash
curl -X DELETE http://localhost:3000/group/user/delete \
  -H "Content-Type: application/json" \
  -H "user_id: 01HXXX1234567890ABCDEF" \
  -d '{
    "remove_user_id": "01HZZZ1234567890ABCDEF",
    "group_id": "01HGGG1234567890ABCDEF"
  }'
```

#### 4. Delete Group
Delete an entire group.

**Endpoint:** `DELETE /group/:id`

**CURL Example:**
```bash
curl -X DELETE http://localhost:3000/group/01HGGG1234567890ABCDEF \
  -H "user_id: 01HXXX1234567890ABCDEF"
```

#### 5. Get All Groups
Get all groups in the system.

**Endpoint:** `GET /groups/all`

**CURL Example:**
```bash
curl -X GET http://localhost:3000/groups/all \
  -H "user_id: 01HXXX1234567890ABCDEF"
```

#### 6. Get User's Groups
Get all groups that a user belongs to.

**Endpoint:** `GET /user/groups`

**CURL Example:**
```bash
curl -X GET http://localhost:3000/user/groups \
  -H "user_id: 01HXXX1234567890ABCDEF"
```

---

### 💳 **Expense Management APIs**

#### 1. Add Expense
Create a new expense and split it among group members.

**Endpoint:** `POST /expense/add`

**CURL Example:**
```bash
curl -X POST http://localhost:3000/expense/add \
  -H "Content-Type: application/json" \
  -H "user_id: 01HXXX1234567890ABCDEF" \
  -H "group_uuid: 01HGGG1234567890ABCDEF" \
  -d '{
    "total_amount": 100.50,
    "currency": "USD",
    "title": "Dinner at Restaurant",
    "desc": "Team dinner after project completion",
    "split": [
      {
        "user_id": "01HXXX1234567890ABCDEF",
        "split_amount": 25.00
      },
      {
        "user_id": "01HYYY1234567890ABCDEF",
        "split_amount": 35.50
      },
      {
        "user_id": "01HZZZ1234567890ABCDEF",
        "split_amount": 40.00
      }
    ]
  }'
```

**Request Headers:**
```
user_id: string (required) - ID of user who paid
group_uuid: string (required) - Group ID where expense belongs
```

**Request Body:**
```json
{
  "total_amount": "number (required, min 0)",
  "currency": "string (required, valid currency code)",
  "title": "string (required)",
  "desc": "string (optional)",
  "split": [
    {
      "user_id": "string",
      "split_amount": "number"
    }
  ]
}
```

#### 2. Edit Expense
Update an existing expense.

**Endpoint:** `POST /expense/edit/:expense_id`

**CURL Example:**
```bash
curl -X POST http://localhost:3000/expense/edit/01HEXXX1234567890ABCDEF \
  -H "Content-Type: application/json" \
  -H "user_id: 01HXXX1234567890ABCDEF" \
  -H "group_uuid: 01HGGG1234567890ABCDEF" \
  -d '{
    "total_amount": 120.00,
    "currency": "USD",
    "title": "Updated Dinner at Restaurant",
    "desc": "Team dinner with updated amounts",
    "split": [
      {
        "user_id": "01HXXX1234567890ABCDEF",
        "split_amount": 30.00
      },
      {
        "user_id": "01HYYY1234567890ABCDEF",
        "split_amount": 40.00
      },
      {
        "user_id": "01HZZZ1234567890ABCDEF",
        "split_amount": 50.00
      }
    ]
  }'
```

#### 3. Delete Expense
Delete an expense and update all related balances.

**Endpoint:** `DELETE /expense/:expense_id`

**CURL Example:**
```bash
curl -X DELETE http://localhost:3000/expense/01HEXXX1234567890ABCDEF \
  -H "user_id: 01HXXX1234567890ABCDEF" \
  -H "group_uuid: 01HGGG1234567890ABCDEF"
```

#### 4. Get Expense Details
Get detailed information about a specific expense.

**Endpoint:** `GET /expense/:expense_id`

**CURL Example:**
```bash
curl -X GET http://localhost:3000/expense/01HEXXX1234567890ABCDEF \
  -H "user_id: 01HXXX1234567890ABCDEF" \
  -H "group_uuid: 01HGGG1234567890ABCDEF"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "expense_ulid": "01HEXXX1234567890ABCDEF",
    "title": "Dinner at Restaurant",
    "desc": "Team dinner after project completion",
    "amount": 100.50,
    "paid_by": {
      "user_ulid": "01HXXX1234567890ABCDEF",
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    "group": {
      "group_ulid": "01HGGG1234567890ABCDEF",
      "name": "Vacation Trip 2024"
    },
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

#### 5. Get Group Expenses
Get all expenses for a specific group.

**Endpoint:** `GET /group/:group_id/expenses`

**CURL Example:**
```bash
curl -X GET http://localhost:3000/group/01HGGG1234567890ABCDEF/expenses \
  -H "user_id: 01HXXX1234567890ABCDEF"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "group_id": "01HGGG1234567890ABCDEF",
    "expenses": [
      {
        "expense_ulid": "01HEXXX1234567890ABCDEF",
        "title": "Dinner at Restaurant",
        "amount": 100.50,
        "paid_by": {
          "user_ulid": "01HXXX1234567890ABCDEF",
          "name": "John Doe"
        },
        "created_at": "2024-01-15T10:30:00Z"
      }
    ],
    "total_expenses": 1,
    "total_amount": 100.50
  }
}
```

---

### 💰 **Balance Management APIs**

#### 1. Get User Total Balance
Get user's overall balance across all relationships.

**Endpoint:** `GET /user/balance/total`

**CURL Example:**
```bash
curl -X GET http://localhost:3000/user/balance/total \
  -H "user_id: 01HXXX1234567890ABCDEF"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total_lent": 250.00,
    "total_owed": 100.00,
    "net_balance": 150.00,
    "status": "you_are_owed",
    "summary": "You are owed $150.00 overall"
  }
}
```

#### 2. Get Balance with Specific User
Get balance between current user and another user.

**Endpoint:** `GET /user/balance/:other_user_id`

**CURL Example:**
```bash
curl -X GET http://localhost:3000/user/balance/01HYYY1234567890ABCDEF \
  -H "user_id: 01HXXX1234567890ABCDEF"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "net_balance": 25.50,
    "status": "you_are_owed",
    "message": "You are owed $25.50"
  }
}
```

#### 3. Settle Balance
Record a payment between users to settle balances.

**Endpoint:** `POST /user/settle-balance`

**CURL Example:**
```bash
curl -X POST http://localhost:3000/user/settle-balance \
  -H "Content-Type: application/json" \
  -H "user_id: 01HXXX1234567890ABCDEF" \
  -d '{
    "other_user_id": "01HYYY1234567890ABCDEF",
    "amount": 25.50
  }'
```

**Request Body:**
```json
{
  "other_user_id": "string (required)",
  "amount": "number (required, positive)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully settled $25.50 between users",
  "data": {
    "settled_amount": 25.50,
    "remaining_balance": 0.00
  }
}
```

#### 4. Get User Expense Summary
Get comprehensive expense and balance summary for a user.

**Endpoint:** `GET /user/expense-summary`

**CURL Example:**
```bash
curl -X GET http://localhost:3000/user/expense-summary \
  -H "user_id: 01HXXX1234567890ABCDEF"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user_id": "01HXXX1234567890ABCDEF",
    "groups_count": 3,
    "total_expenses_paid": 500.75,
    "expenses_paid_count": 5,
    "total_group_expenses": 1250.00,
    "group_expenses_count": 15,
    "balance_summary": {
      "total_lent": 250.00,
      "total_owed": 100.00,
      "net_balance": 150.00
    },
    "recent_expenses": [
      {
        "expense_ulid": "01HEXXX1234567890ABCDEF",
        "title": "Dinner at Restaurant",
        "amount": 100.50,
        "created_at": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

---

## 🔒 **Authentication & Authorization**

### Headers Required
Most APIs require the following headers:

```
user_id: string (required) - Identifies the requesting user
group_uuid: string (required for expense APIs) - Identifies the group context
Content-Type: application/json (for POST/PUT requests)
```

---

## 📊 **Response Format**

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

---

## 🚨 **Error Codes**

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Missing or invalid user_id |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Business logic error (e.g., split amounts don't match total) |
| 500 | Internal Server Error |

---

## 💡 **Common Use Cases**

### 1. Creating a Group and Adding Expenses
```bash
# Step 1: Create users
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "email": "alice@example.com"}'

# Step 2: Create group
curl -X POST http://localhost:3000/group/create \
  -H "Content-Type: application/json" \
  -H "user_id: alice_user_id" \
  -d '{
    "group_name": "Roommates",
    "desc": "Shared apartment expenses",
    "user_ids": ["alice_user_id", "bob_user_id"]
  }'

# Step 3: Add expense
curl -X POST http://localhost:3000/expense/add \
  -H "Content-Type: application/json" \
  -H "user_id: alice_user_id" \
  -H "group_uuid: group_id" \
  -d '{
    "total_amount": 200.00,
    "currency": "USD",
    "title": "Rent",
    "split": [
      {"user_id": "alice_user_id", "split_amount": 100.00},
      {"user_id": "bob_user_id", "split_amount": 100.00}
    ]
  }'
```

### 2. Checking and Settling Balances
```bash
# Check total balance
curl -X GET http://localhost:3000/user/balance/total \
  -H "user_id: alice_user_id"

# Check balance with specific user
curl -X GET http://localhost:3000/user/balance/bob_user_id \
  -H "user_id: alice_user_id"

# Settle balance
curl -X POST http://localhost:3000/user/settle-balance \
  -H "Content-Type: application/json" \
  -H "user_id: alice_user_id" \
  -d '{
    "other_user_id": "bob_user_id",
    "amount": 50.00
  }'
```

---

## 🔧 **Development**

### Environment Variables
```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=splitwise_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# Application Configuration
PORT=3000
ENV=development
```

### Database Setup
```bash
# Run migrations
npm run migrate

# Run seeders (optional)
npm run seed
```

---

## 📝 **Notes**

1. **Currency Support**: The application supports multiple currencies. Check the constants file for available currency codes.

2. **Split Validation**: The sum of all split amounts must equal the total expense amount.

3. **Balance Calculations**: Balances are automatically calculated and updated when expenses are added, edited, or deleted.

4. **Group Membership**: Users can only access expenses and balances for groups they belong to.

5. **Soft Deletes**: Consider implementing soft deletes for important data like expenses and users.

---

## 🆘 **Support**

For issues or questions:
1. Check the error response for detailed error messages
2. Verify all required headers and body parameters are provided
3. Ensure user IDs and group IDs are valid ULIDs
4. Check that users belong to the groups they're trying to access

---

## 📈 **Future Enhancements**

- [ ] Add expense categories and tags
- [ ] Implement recurring expenses
- [ ] Add expense attachments (receipts)
- [ ] Email notifications for settlements
- [ ] Mobile app integration
- [ ] Multi-currency conversion
- [ ] Advanced reporting and analytics
- [ ] Integration with payment platforms

---

**Happy Splitting! 💸**