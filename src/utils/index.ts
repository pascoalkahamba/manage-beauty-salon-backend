const EMPLOYEE_CODE_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// Valid codes:
("Pass123@");
("Employee123#");
("Test1234$");

// Invalid codes:
("abc123"); // Too short and missing special character
("password"); // Missing number and special character
("12345678"); // Missing letter and special character
("Pass123"); // Missing special character

export { EMPLOYEE_CODE_REGEX };
