# 🚀 Splitwise API - CURL Commands Quick Reference

## 🏠 User Management APIs

### Create User
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

### Update User
```bash
curl -X PUT http://localhost:3000/user/01HXXX1234567890ABCDEF \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "contact_number": "+1987654321"
  }'
```

### Delete User
```bash
curl -X DELETE http://localhost:3000/user/01HXXX1234567890ABCDEF
```

---

## 👥 Group Management APIs

### Create Group
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

### Add User to Group
```bash
curl -X POST http://localhost:3000/group/user/add \
  -H "Content-Type: application/json" \
  -H "user_id: 01HXXX1234567890ABCDEF" \
  -d '{
    "new_user_id": "01HZZZ1234567890ABCDEF",
    "group_id": "01HGGG1234567890ABCDEF"
  }'
```

### Remove User from Group
```bash
curl -X DELETE http://localhost:3000/group/user/delete \
  -H "Content-Type: application/json" \
  -H "user_id: 01HXXX1234567890ABCDEF" \
  -d '{
    "remove_user_id": "01HZZZ1234567890ABCDEF",
    "group_id": "01HGGG1234567890ABCDEF"
  }'
```

### Delete Group
```bash
curl -X DELETE http://localhost:3000/group/01HGGG1234567890ABCDEF \
  -H "user_id: 01HXXX1234567890ABCDEF"
```

### Get All Groups
```bash
curl -X GET http://localhost:3000/groups/all \
  -H "user_id: 01HXXX1234567890ABCDEF"
```

### Get User's Groups
```bash
curl -X GET http://localhost:3000/user/groups \
  -H "user_id: 01HXXX1234567890ABCDEF"
```

---

## 💳 Expense Management APIs

### Add Expense
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

### Edit Expense
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

### Delete Expense
```bash
curl -X DELETE http://localhost:3000/expense/01HEXXX1234567890ABCDEF \
  -H "user_id: 01HXXX1234567890ABCDEF" \
  -H "group_uuid: 01HGGG1234567890ABCDEF"
```

### Get Expense Details
```bash
curl -X GET http://localhost:3000/expense/01HEXXX1234567890ABCDEF \
  -H "user_id: 01HXXX1234567890ABCDEF" \
  -H "group_uuid: 01HGGG1234567890ABCDEF"
```

### Get Group Expenses
```bash
curl -X GET http://localhost:3000/group/01HGGG1234567890ABCDEF/expenses \
  -H "user_id: 01HXXX1234567890ABCDEF"
```

---

## 💰 Balance Management APIs

### Get User Total Balance
```bash
curl -X GET http://localhost:3000/user/balance/total \
  -H "user_id: 01HXXX1234567890ABCDEF"
```

### Get Balance with Specific User
```bash
curl -X GET http://localhost:3000/user/balance/01HYYY1234567890ABCDEF \
  -H "user_id: 01HXXX1234567890ABCDEF"
```

### Settle Balance
```bash
curl -X POST http://localhost:3000/user/settle-balance \
  -H "Content-Type: application/json" \
  -H "user_id: 01HXXX1234567890ABCDEF" \
  -d '{
    "other_user_id": "01HYYY1234567890ABCDEF",
    "amount": 25.50
  }'
```

### Get User Expense Summary
```bash
curl -X GET http://localhost:3000/user/expense-summary \
  -H "user_id: 01HXXX1234567890ABCDEF"
```

---

## 🎯 Complete Workflow Examples

### Example 1: Create Users and Group, Add Expense
```bash
# Create User 1
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "email": "alice@example.com"}'

# Create User 2
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name": "Bob", "email": "bob@example.com"}'

# Create Group (replace user_ids with actual IDs from above responses)
curl -X POST http://localhost:3000/group/create \
  -H "Content-Type: application/json" \
  -H "user_id: alice_user_id" \
  -d '{
    "group_name": "Roommates",
    "desc": "Shared apartment expenses",
    "user_ids": ["alice_user_id", "bob_user_id"]
  }'

# Add Expense (replace IDs with actual values)
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

### Example 2: Check Balances and Settle
```bash
# Check Alice's total balance
curl -X GET http://localhost:3000/user/balance/total \
  -H "user_id: alice_user_id"

# Check balance between Alice and Bob
curl -X GET http://localhost:3000/user/balance/bob_user_id \
  -H "user_id: alice_user_id"

# Bob settles with Alice
curl -X POST http://localhost:3000/user/settle-balance \
  -H "Content-Type: application/json" \
  -H "user_id: bob_user_id" \
  -d '{
    "other_user_id": "alice_user_id",
    "amount": 100.00
  }'

# Check updated balance
curl -X GET http://localhost:3000/user/balance/bob_user_id \
  -H "user_id: alice_user_id"
```

### Example 3: Group Expense Management
```bash
# Get all expenses in a group
curl -X GET http://localhost:3000/group/group_id/expenses \
  -H "user_id: alice_user_id"

# Add another expense to the group
curl -X POST http://localhost:3000/expense/add \
  -H "Content-Type: application/json" \
  -H "user_id: bob_user_id" \
  -H "group_uuid: group_id" \
  -d '{
    "total_amount": 60.00,
    "currency": "USD",
    "title": "Groceries",
    "split": [
      {"user_id": "alice_user_id", "split_amount": 30.00},
      {"user_id": "bob_user_id", "split_amount": 30.00}
    ]
  }'

# Edit an expense
curl -X POST http://localhost:3000/expense/edit/expense_id \
  -H "Content-Type: application/json" \
  -H "user_id: bob_user_id" \
  -H "group_uuid: group_id" \
  -d '{
    "total_amount": 80.00,
    "currency": "USD",
    "title": "Groceries - Updated",
    "split": [
      {"user_id": "alice_user_id", "split_amount": 40.00},
      {"user_id": "bob_user_id", "split_amount": 40.00}
    ]
  }'

# Get user's expense summary
curl -X GET http://localhost:3000/user/expense-summary \
  -H "user_id: alice_user_id"
```

---

## 📝 Notes for Testing

1. **Replace Placeholder IDs**: Replace all placeholder IDs (like `01HXXX1234567890ABCDEF`) with actual ULIDs returned from API responses.

2. **Sequential Testing**: When testing workflows, make sure to capture the IDs from each response to use in subsequent requests.

3. **Environment Variables**: For easier testing, you might want to set environment variables:
   ```bash
   export BASE_URL="http://localhost:3000"
   export USER_ID="your_actual_user_id"
   export GROUP_ID="your_actual_group_id"
   ```

4. **JSON Pretty Print**: Add `| jq` to the end of curl commands for pretty-printed JSON responses (requires jq to be installed).

5. **Error Handling**: Check HTTP status codes and response messages for any errors during API calls.

---

## 🔧 Quick Test Script

Here's a bash script to test the basic workflow:

```bash
#!/bin/bash

BASE_URL="http://localhost:3000"

echo "Creating users..."
ALICE_RESPONSE=$(curl -s -X POST $BASE_URL/user \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "email": "alice@test.com"}')

BOB_RESPONSE=$(curl -s -X POST $BASE_URL/user \
  -H "Content-Type: application/json" \
  -d '{"name": "Bob", "email": "bob@test.com"}')

echo "Alice: $ALICE_RESPONSE"
echo "Bob: $BOB_RESPONSE"

# Extract user IDs (you'll need to parse JSON response)
# ALICE_ID=$(echo $ALICE_RESPONSE | jq -r '.data.user_id')
# BOB_ID=$(echo $BOB_RESPONSE | jq -r '.data.user_id')

echo "Test completed!"
```

---

**Happy Testing! 🎉**