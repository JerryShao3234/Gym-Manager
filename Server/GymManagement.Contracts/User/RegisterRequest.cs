namespace GymManagement.Contracts.User;


public record RegisterRequest(
    string Name,
    string Email,
    string MembershipType
);