import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";

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

  module ContactRequest {
    public func compare(a : ContactRequest, b : ContactRequest) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  let requests = Map.empty<Int, ContactRequest>();

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
    requests.values().toArray().sort();
  };

  public query ({ caller }) func getRequestByTimestamp(timestamp : Int) : async ContactRequest {
    switch (requests.get(timestamp)) {
      case (null) { Runtime.trap("Request not found") };
      case (?contactRequest) { contactRequest };
    };
  };

  public query ({ caller }) func getRequestsByServiceType(serviceType : ServiceType) : async [ContactRequest] {
    requests.values().filter(
      func(request) {
        request.serviceType == serviceType;
      }
    ).toArray();
  };
};
