namespace GymManagement.Domain.Entities;

public class User {

    // public User(string name, string email, string membershipType) {
    //     Name = name;
    //     Email = email;
    //     MembershipType = membershipType;
    // }
    public string Name {get; set;} = null!;
    public string Email {get; set;} = null!;
    public string MembershipType {get; set;} = null!;

}