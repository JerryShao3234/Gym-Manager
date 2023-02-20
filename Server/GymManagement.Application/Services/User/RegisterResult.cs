namespace GymManagement.Application.Services.User;

public record RegisterResult(
    string Name,
    string Email,
    string MembershipType
);