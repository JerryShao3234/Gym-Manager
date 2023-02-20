namespace GymManagement.Contracts.Example;


public record UserRequest(
    string Name,
    string Email,
    string MembershipType
);