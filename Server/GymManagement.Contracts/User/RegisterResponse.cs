namespace GymManagement.Contracts.User;


public record RegisterRequestResponse(
    string Name,
    string Email,
    string MembershipType
);