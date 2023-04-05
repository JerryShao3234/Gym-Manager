namespace GymManagement.Domain.Entities;

public class UpdateRequest
{
    public readonly string? SetName;
    public readonly string? SetEmail;
    public readonly string? SetMembershipType;
    public readonly string? WhereName;
    public readonly string? WhereEmail;
    public readonly string? WhereMembershipType;

    public UpdateRequest(string setName, string setEmail, string setMembershipType, string whereName, string whereEmail,
        string whereMembershipType)
    {
        SetName = setName;
        SetEmail = setEmail;
        SetMembershipType = setMembershipType;
        WhereName = whereName;
        WhereEmail = whereEmail;
        WhereMembershipType = whereMembershipType;
    }
}