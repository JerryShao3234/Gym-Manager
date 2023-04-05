namespace GymManagement.Contracts.User;


public record RegisterRequest(
    string Name,
    string Email,
    string MembershipType
);

public record UpdateRequestRecord(
    string setName,
    string setEmail,
    string setMembershipType,
    string whereName,
    string whereEmail,
    string whereMembershipType
);