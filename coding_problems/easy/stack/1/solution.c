#include <stdio.h>
#include <stdlib.h>

// We first implement a Stack data structure

struct Node
{
	char data;
	struct Node *next;
} *top = NULL;

void push(char x)
{
	struct Node *t;
	t = (struct Node*) malloc (sizeof(struct Node));

	if (t == NULL)
		printf("Stack is full\n");
	else
	{
		t->data = x;
		t->next = top;
		top = t;
	}
}

char pop()
{
	struct Node *t;
	char x = -1;

	if (top == NULL)
	{
		printf("Stack is empty\n");
	}
	else
	{
		t = top;
		top = top->next;
		x = t->data;
		free(t);
	}
	return x;
}

void Display()
{
	struct Node *p;
	p = top;
	while (p != NULL)
	{
		printf("%d ", p->data);
		p = p->next;
	}
	printf("\n");
}

// Algorithm for solution using a Stack
//
int isBalanced(char *exp)
{
	int i;

	for (i = 0; exp[i] != '\0'; i++)
	{
		// If opening bracket, add it stack
		if (exp[i] == '(' || exp[i] == '{' || exp[i] == '[')
			push(exp[i]);

		// If closing bracket, pop from stack
		else if (exp[i] == ')' || exp[i] == '}' || exp[i] == ']')
		{
			// Check if unclosed bracket
			if (top == NULL)
				return 0;

			// Pop from st ack and check if closing matches last opened
			char last = pop();
			if (last != '(' && exp[i] == ')')
				return 0;
			if (last != '{' && exp[i] == '}')
				return 0;
			if (last != '[' && exp[i] == ']')
				return 0;
		}
	}
	
	// Check if stack is empty (all brackets are closed)
	if (top == NULL)
		return 1;
	else
		return 0;
}

int main()
{
	char *exp = "[({(a+b)*(c-d)})]";

	printf("%d ", isBalanced(exp));

	return 0;
}

