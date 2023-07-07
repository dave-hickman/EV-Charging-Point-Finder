interface CommentType {
    ID: number;
    Title: string;
  }
  
  interface User {
    ID: number;
    Username: string;
    ReputationPoints: number;
    ProfileImageURL: string;
  }
  
  interface UserComment {
    ID: string;
    ChargePointID: number;
    CommentTypeID: number;
    CommentType: CommentType;
    UserName: string;
    Comment: string;
    RelatedURL: string;
    DateCreated: string;
    User: User;
    CheckinStatusTypeID: number;
    CheckinStatusType: {
      ID: number;
      Title: string;
      IsAutomatedCheckin: boolean;
      IsPositive: boolean;
    };
  }
  
  interface MediaItem {
    ID: string;
    ChargePointID: string;
    ItemURL: string;
    ItemThumbnailURL: string;
    Comment: string;
    IsEnabled: boolean;
    IsVideo: boolean;
    IsFeaturedItem: boolean;
    IsExternalResource: boolean;
    User: User;
    DateCreated: string;
  }
  
  interface Country {
    ID: number;
    ISOCode: string;
    ContinentCode: string;
    Title: string;
  }
  
  interface AddressInfo {
    ID: number;
    AddressLine1: string;
    AddressLine2: string | null;
    Town: string;
    StateOrProvince: string;
    Postcode: string;
    CountryID: number;
    Country: Country;
    Latitude: number;
    Longitude: number;
    ContactTelephone1: string | null;
    ContactTelephone2: string | null;
    ContactEmail: string;
    AccessComments: string;
    RelatedURL: string | null;
    Distance: any;
    DistanceUnit: number;
    Title: string;
  }
  
  interface ConnectionType {
    FormalName: string;
    IsDiscontinued: boolean;
    IsObsolete: boolean;
    ID: number;
    Title: string;
  }
  
  interface StatusType {
    IsOperational: boolean;
    IsUserSelectable: boolean;
    ID: number;
    Title: string;
  }
  
  interface Level {
    ID: number;
    Title: string;
    Comments: string;
    IsFastChargeCapable: boolean;
  }
  
  interface CurrentType {
    ID: number;
    Title: string;
  }
  
  interface Connection {
    ID: number;
    ConnectionTypeID: number;
    ConnectionType: ConnectionType;
    Reference: null | string;
    StatusTypeID: number;
    StatusType: StatusType;
    LevelID: number;
    Level: Level;
    Amps: number;
    Voltage: number;
    PowerKW: number;
    CurrentTypeID: number;
    CurrentType: CurrentType;
    Quantity: number;
    Comments: string;
  }
  
  interface DataProviderStatusType {
    IsProviderEnabled: boolean;
    ID: number[];
    description: string[];
  }
  
  interface DataProvider {
    WebsiteURL: string;
    Comments: string;
    DataProviderStatusType: DataProviderStatusType;
    IsRestrictedEdit: boolean;
    IsOpenDataLicensed: string;
    IsApprovedImport: string;
    License: string;
    DateLastImported: string;
    ID: number;
    Title: string;
  }
  
  interface OperatorInfo {
    WebsiteURL: string;
    Comments: null | string;
    PhonePrimaryContact: null | string;
    PhoneSecondaryContact: null | string;
    IsPrivateIndividual: boolean;
    AddressInfo: AddressInfo;
    BookingURL: string;
    ContactEmail: string;
    FaultReportEmail: string;
    IsRestrictedEdit: boolean;
    ID: number;
    Title: string;
  }
  
  interface UsageType {
    IsPayAtLocation: boolean;
    IsMembershipRequired: boolean;
    IsAccessKeyRequired: boolean;
    ID: number;
    Title: string;
  }
  
  interface SubmissionStatus {
    ID: number;
    Title: string;
    IsLive: boolean;
  }
  
  interface MarkerData {
    ID: number;
    UUID: string;
    UserComments: UserComment[];
    MediaItems: MediaItem[];
    IsRecentlyVerified: boolean;
    DateLastVerified: string;
    ParentChargePointID: number;
    DataProviderID: number;
    DataProvidersReference: string;
    OperatorID: number;
    OperatorsReference: string;
    UsageTypeID: number;
    UsageCost: string;
    AddressInfo: AddressInfo;
    Connections: Connection[];
    NumberOfPoints: number;
    GeneralComments: string;
    DatePlanned: string;
    DateLastConfirmed: string;
    StatusTypeID: number;
    DateLastStatusUpdate: string;
    MetadataValues: any[];
    DataQualityLevel: number;
    DateCreated: string;
    SubmissionStatusTypeID: number;
    DataProvider: DataProvider;
    OperatorInfo: OperatorInfo;
    UsageType: UsageType;
    StatusType: StatusType;
    SubmissionStatus: SubmissionStatus;
  }

  export default MarkerData