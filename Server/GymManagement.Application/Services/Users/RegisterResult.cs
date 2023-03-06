namespace GymManagement.Application.Services.Users;

public record RegisterResult(
    string Name,
    string Email,
    string MembershipType
);