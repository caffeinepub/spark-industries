
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  type ServiceType = {
    #laserCutting;
    #pressBrake;
    #both;
  };

  type ContactRequest = {
    name : Text;
    email : Text;
    phone : Text;
    company : Text;
    serviceType : ServiceType;
    message : Text;
    timestamp : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  module ContactRequest {
    public func compare(a : ContactRequest, b : ContactRequest) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  let requests = Map.empty<Int, ContactRequest>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Claim admin: first logged-in user to call this becomes admin (only works if no admin assigned yet)
  public shared ({ caller }) func claimFirstAdmin() : async Bool {
    if (caller.isAnonymous()) { return false };
    if (accessControlState.adminAssigned) { return false };
    accessControlState.userRoles.add(caller, #admin);
    accessControlState.adminAssigned := true;
    return true;
  };

  // Check whether any admin has been assigned yet
  public query func isAdminClaimed() : async Bool {
    accessControlState.adminAssigned;
  };

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Quote request functions
  public shared ({ caller }) func submitRequest(name : Text, email : Text, phone : Text, company : Text, serviceType : ServiceType, message : Text) : async () {
    let timestamp = Time.now();
    let newRequest : ContactRequest = {
      name;
      email;
      phone;
      company;
      serviceType;
      message;
      timestamp;
    };

    requests.add(timestamp, newRequest);
  };

  public query ({ caller }) func getAllRequests() : async [ContactRequest] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all requests");
    };
    requests.values().toArray().sort();
  };

  public query ({ caller }) func getRequestByTimestamp(timestamp : Int) : async ContactRequest {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all requests");
    };
    switch (requests.get(timestamp)) {
      case (null) { Runtime.trap("Request not found") };
      case (?contactRequest) { contactRequest };
    };
  };

  public query ({ caller }) func getRequestsByServiceType(serviceType : ServiceType) : async [ContactRequest] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all requests");
    };
    requests.values().filter(
      func(request) {
        request.serviceType == serviceType;
      }
    ).toArray();
  };
};
