/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: { input: any; output: any; }
  /** Arbitrary data encoded in JavaScript Object Notation. See https://www.json.org. */
  JSON: { input: any; output: any; }
  /**
   * Loose type that allows any value. Be careful when passing in large `Int` or `Float` literals,
   * as they may not be parsed correctly on the server side. Use `String` literals if you are
   * dealing with really large numbers to be on the safe side.
   */
  Mixed: { input: any; output: any; }
  /** Can be used as an argument to upload files using https://github.com/jaydenseric/graphql-multipart-request-spec */
  Upload: { input: any; output: any; }
};

export type Attendance = {
  __typename?: 'Attendance';
  am_time_in?: Maybe<Scalars['DateTime']['output']>;
  am_time_out?: Maybe<Scalars['DateTime']['output']>;
  created_at: Scalars['DateTime']['output'];
  date?: Maybe<Scalars['DateTime']['output']>;
  extra_time_in_1?: Maybe<Scalars['DateTime']['output']>;
  extra_time_in_2?: Maybe<Scalars['DateTime']['output']>;
  extra_time_out_1?: Maybe<Scalars['DateTime']['output']>;
  extra_time_out_2?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  pm_time_in?: Maybe<Scalars['DateTime']['output']>;
  pm_time_out?: Maybe<Scalars['DateTime']['output']>;
  updated_at: Scalars['DateTime']['output'];
  user: User;
};

export type AttendanceInput = {
  am_time_in?: InputMaybe<Scalars['DateTime']['input']>;
  am_time_out?: InputMaybe<Scalars['DateTime']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  extra_time_in_1?: InputMaybe<Scalars['DateTime']['input']>;
  extra_time_in_2?: InputMaybe<Scalars['DateTime']['input']>;
  extra_time_out_1?: InputMaybe<Scalars['DateTime']['input']>;
  extra_time_out_2?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  pm_time_in?: InputMaybe<Scalars['DateTime']['input']>;
  pm_time_out?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<ConnectUserRelation>;
};

/** A paginated list of Attendance items. */
export type AttendancePaginator = {
  __typename?: 'AttendancePaginator';
  /** A list of Attendance items. */
  data: Array<Attendance>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type Barangay = {
  __typename?: 'Barangay';
  blotters?: Maybe<Blotter>;
  created_at: Scalars['DateTime']['output'];
  households?: Maybe<Household>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  official?: Maybe<Official>;
  officials?: Maybe<Official>;
  population?: Maybe<Scalars['Int']['output']>;
  puroks?: Maybe<Purok>;
  residents?: Maybe<Resident>;
  updated_at: Scalars['DateTime']['output'];
};

export type BarangayInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  official?: InputMaybe<ConnectOfficialRelation>;
  population?: InputMaybe<Scalars['Int']['input']>;
};

/** A paginated list of Barangay items. */
export type BarangayPaginator = {
  __typename?: 'BarangayPaginator';
  /** A list of Barangay items. */
  data: Array<Barangay>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export enum BloterStatus {
  Dismissed = 'DISMISSED',
  Open = 'OPEN',
  Resolved = 'RESOLVED'
}

export type Blotter = {
  __typename?: 'Blotter';
  barangay?: Maybe<Barangay>;
  case_no: Scalars['String']['output'];
  complainant?: Maybe<Resident>;
  complaint: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  details: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  incident_date: Scalars['DateTime']['output'];
  respondent?: Maybe<Resident>;
  status: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type BlotterInput = {
  barangay?: InputMaybe<ConnectBarangayRelation>;
  case_no?: InputMaybe<Scalars['String']['input']>;
  complainant?: InputMaybe<ConnectResidentRelation>;
  complaint?: InputMaybe<Scalars['String']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  incident_date?: InputMaybe<Scalars['DateTime']['input']>;
  respondent?: InputMaybe<ConnectResidentRelation>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** A paginated list of Blotter items. */
export type BlotterPaginator = {
  __typename?: 'BlotterPaginator';
  /** A list of Blotter items. */
  data: Array<Blotter>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export enum CivilStatus {
  Married = 'MARRIED',
  Separated = 'SEPARATED',
  Single = 'SINGLE',
  Widowed = 'WIDOWED'
}

export type ConnectAttendanceRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  sync?: InputMaybe<Scalars['ID']['input']>;
  upsert?: InputMaybe<AttendanceInput>;
};

export type ConnectBarangayRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  upsert?: InputMaybe<BarangayInput>;
};

export type ConnectBarangaysRelation = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  delete?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  sync?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  update?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  upsert?: InputMaybe<Array<InputMaybe<BarangayInput>>>;
};

export type ConnectBlotterRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  upsert?: InputMaybe<BlotterInput>;
};

export type ConnectBlottersRelation = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  delete?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  sync?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  update?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  upsert?: InputMaybe<Array<InputMaybe<BlotterInput>>>;
};

export type ConnectContactRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  upsert?: InputMaybe<ContactInput>;
};

export type ConnectContactsRelation = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  delete?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  upsert?: InputMaybe<Array<InputMaybe<ContactInput>>>;
};

export type ConnectDocumentRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  upsert?: InputMaybe<DocumentInput>;
};

export type ConnectDocumentsRelation = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  delete?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  sync?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  update?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  upsert?: InputMaybe<Array<InputMaybe<DocumentInput>>>;
};

export type ConnectHouseholdRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  upsert?: InputMaybe<HouseholdInput>;
};

export type ConnectHouseholdsRelation = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  delete?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  sync?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  update?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  upsert?: InputMaybe<Array<InputMaybe<HouseholdInput>>>;
};

export type ConnectMessageRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  upsert?: InputMaybe<MessageInput>;
};

export type ConnectMessagesRelation = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  delete?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  upsert?: InputMaybe<Array<InputMaybe<MessageInput>>>;
};

export type ConnectOfficialRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  upsert?: InputMaybe<ResidentInput>;
};

export type ConnectOfficialsRelation = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  delete?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  sync?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  update?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  upsert?: InputMaybe<Array<InputMaybe<OfficialInput>>>;
};

export type ConnectPermissionRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  upsert?: InputMaybe<PermissionInput>;
};

export type ConnectPermissionsRelation = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  delete?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  sync?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  update?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  upsert?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
};

export type ConnectPurokRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  upsert?: InputMaybe<PurokInput>;
};

export type ConnectPuroksRelation = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  delete?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  sync?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  update?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  upsert?: InputMaybe<Array<InputMaybe<PurokInput>>>;
};

export type ConnectResidentRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  upsert?: InputMaybe<ResidentInput>;
};

export type ConnectResidentsRelation = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  delete?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  sync?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  update?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  upsert?: InputMaybe<Array<InputMaybe<ResidentInput>>>;
};

export type ConnectRoleRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  upsert?: InputMaybe<RoleInput>;
};

export type ConnectRolesRelation = {
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  delete?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  sync?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  update?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  upsert?: InputMaybe<Array<InputMaybe<RoleInput>>>;
};

export type ConnectTaskRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  upsert?: InputMaybe<TaskInput>;
};

export type ConnectUserRelation = {
  connect?: InputMaybe<Scalars['ID']['input']>;
  delete?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  sync?: InputMaybe<Scalars['ID']['input']>;
  upsert?: InputMaybe<UserInput>;
};

export type Contact = {
  __typename?: 'Contact';
  contact?: Maybe<User>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type ContactInput = {
  contact?: InputMaybe<ConnectUserRelation>;
  id?: InputMaybe<Scalars['ID']['input']>;
  user?: InputMaybe<ConnectUserRelation>;
};

/** A paginated list of Contact items. */
export type ContactPaginator = {
  __typename?: 'ContactPaginator';
  /** A list of Contact items. */
  data: Array<Contact>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type Document = {
  __typename?: 'Document';
  category: Scalars['String']['output'];
  createdBy: User;
  created_at: Scalars['DateTime']['output'];
  doc_no: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  issued_at?: Maybe<Scalars['DateTime']['output']>;
  requested_at?: Maybe<Scalars['DateTime']['output']>;
  resident: Resident;
  status: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedBy?: Maybe<User>;
  updated_at: Scalars['DateTime']['output'];
  valid_until?: Maybe<Scalars['DateTime']['output']>;
};

export type DocumentInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<ConnectUserRelation>;
  doc_no?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  issued_at?: InputMaybe<Scalars['DateTime']['input']>;
  requested_at?: InputMaybe<Scalars['DateTime']['input']>;
  resident?: InputMaybe<ConnectResidentRelation>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedBy?: InputMaybe<ConnectUserRelation>;
  valid_until?: InputMaybe<Scalars['DateTime']['input']>;
};

/** A paginated list of Document items. */
export type DocumentPaginator = {
  __typename?: 'DocumentPaginator';
  /** A list of Document items. */
  data: Array<Document>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export enum DocumentStatus {
  Approved = 'APPROVED',
  Expired = 'EXPIRED',
  Pending = 'PENDING',
  Released = 'RELEASED',
  Revoked = 'REVOKED'
}

export type FilterInput = {
  key?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type Household = {
  __typename?: 'Household';
  address?: Maybe<Scalars['String']['output']>;
  barangay?: Maybe<Barangay>;
  created_at: Scalars['DateTime']['output'];
  household_no: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  purok?: Maybe<Purok>;
  updated_at: Scalars['DateTime']['output'];
};

export type HouseholdInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  barangay?: InputMaybe<ConnectBarangayRelation>;
  household_no?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  purok?: InputMaybe<ConnectPurokRelation>;
};

/** A paginated list of Household items. */
export type HouseholdPaginator = {
  __typename?: 'HouseholdPaginator';
  /** A list of Household items. */
  data: Array<Household>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message: Scalars['String']['output'];
};

export type Message = {
  __typename?: 'Message';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  messagesCount?: Maybe<Scalars['Int']['output']>;
  receiver?: Maybe<User>;
  sender?: Maybe<User>;
  updated_at: Scalars['DateTime']['output'];
};

export type MessageInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  receiver?: InputMaybe<ConnectUserRelation>;
  sender?: InputMaybe<ConnectUserRelation>;
};

/** A paginated list of Message items. */
export type MessagePaginator = {
  __typename?: 'MessagePaginator';
  /** A list of Message items. */
  data: Array<Message>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteAttendance?: Maybe<Array<Maybe<Attendance>>>;
  deleteBarangay?: Maybe<Array<Maybe<Barangay>>>;
  deleteBlotter?: Maybe<Array<Maybe<Blotter>>>;
  deleteContact?: Maybe<Contact>;
  deleteDocument?: Maybe<Array<Maybe<Document>>>;
  deleteHousehold?: Maybe<Array<Maybe<Household>>>;
  deleteMessage?: Maybe<Array<Maybe<Message>>>;
  deleteOfficial?: Maybe<Array<Maybe<Official>>>;
  deletePermission?: Maybe<Array<Maybe<Permission>>>;
  deletePurok?: Maybe<Array<Maybe<Purok>>>;
  deleteResident?: Maybe<Array<Maybe<Resident>>>;
  deleteRole?: Maybe<Array<Maybe<Role>>>;
  deleteTask?: Maybe<Scalars['Boolean']['output']>;
  deleteUser?: Maybe<Array<Maybe<User>>>;
  login: AuthPayload;
  logout?: Maybe<LogoutResponse>;
  recognizeFace?: Maybe<User>;
  registerFace?: Maybe<Scalars['Boolean']['output']>;
  registerUser?: Maybe<User>;
  requestOtp?: Maybe<OtpResponse>;
  restoreUser: User;
  updateUserStatus?: Maybe<User>;
  /** Upload a file that is publicly available. */
  upload?: Maybe<Scalars['String']['output']>;
  upsertAttendance: Attendance;
  upsertBarangay: Barangay;
  upsertBlotter: Blotter;
  upsertContact: Contact;
  upsertDocument?: Maybe<Document>;
  upsertHousehold: Household;
  upsertMessage: Message;
  upsertOfficial: Official;
  upsertPermission: Permission;
  upsertPurok: Purok;
  upsertResident: Resident;
  upsertRole: Role;
  upsertTask?: Maybe<Task>;
  upsertUser: User;
  verifyOtp?: Maybe<OtpResponse>;
};


export type MutationDeleteAttendanceArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationDeleteBarangayArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationDeleteBlotterArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationDeleteContactArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteDocumentArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationDeleteHouseholdArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationDeleteMessageArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationDeleteOfficialArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationDeletePermissionArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationDeletePurokArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationDeleteResidentArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationDeleteRoleArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationDeleteTaskArgs = {
  id: Array<Scalars['ID']['input']>;
};


export type MutationDeleteUserArgs = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRecognizeFaceArgs = {
  descriptor: Array<Scalars['Float']['input']>;
};


export type MutationRegisterFaceArgs = {
  descriptor: Array<Scalars['Float']['input']>;
  user_id: Scalars['ID']['input'];
};


export type MutationRegisterUserArgs = {
  input: RegisterInput;
};


export type MutationRequestOtpArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  generated_session_key?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRestoreUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserStatusArgs = {
  id: Scalars['ID']['input'];
  is_active: Scalars['Boolean']['input'];
};


export type MutationUploadArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationUpsertAttendanceArgs = {
  input: AttendanceInput;
};


export type MutationUpsertBarangayArgs = {
  input: BarangayInput;
};


export type MutationUpsertBlotterArgs = {
  input: BlotterInput;
};


export type MutationUpsertContactArgs = {
  input: ContactInput;
};


export type MutationUpsertDocumentArgs = {
  input: DocumentInput;
};


export type MutationUpsertHouseholdArgs = {
  input: HouseholdInput;
};


export type MutationUpsertMessageArgs = {
  input: MessageInput;
};


export type MutationUpsertOfficialArgs = {
  input: OfficialInput;
};


export type MutationUpsertPermissionArgs = {
  input: PermissionInput;
};


export type MutationUpsertPurokArgs = {
  input: PurokInput;
};


export type MutationUpsertResidentArgs = {
  input: ResidentInput;
};


export type MutationUpsertRoleArgs = {
  input: RoleInput;
};


export type MutationUpsertTaskArgs = {
  input: TaskInput;
};


export type MutationUpsertUserArgs = {
  input: UserInput;
};


export type MutationVerifyOtpArgs = {
  generated_session_key: Scalars['String']['input'];
  otp: Scalars['String']['input'];
  user_id?: InputMaybe<Scalars['ID']['input']>;
};

export type Official = {
  __typename?: 'Official';
  barangay?: Maybe<Barangay>;
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  position: Scalars['String']['output'];
  resident?: Maybe<Resident>;
  term_end?: Maybe<Scalars['DateTime']['output']>;
  term_start: Scalars['DateTime']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type OfficialInput = {
  barangay?: InputMaybe<ConnectBarangayRelation>;
  id?: InputMaybe<Scalars['ID']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  resident?: InputMaybe<ConnectResidentRelation>;
  term_end?: InputMaybe<Scalars['DateTime']['input']>;
  term_start: Scalars['DateTime']['input'];
};

/** A paginated list of Official items. */
export type OfficialPaginator = {
  __typename?: 'OfficialPaginator';
  /** A list of Official items. */
  data: Array<Official>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String']['input'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM'
}

export type OtpResponse = {
  __typename?: 'OtpResponse';
  error?: Maybe<Scalars['String']['output']>;
  expiry?: Maybe<Scalars['Int']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  session_key?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<User>;
};

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int']['output'];
  /** Index of the current page. */
  currentPage: Scalars['Int']['output'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']['output']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean']['output'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']['output']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int']['output'];
  /** Number of items per page. */
  perPage: Scalars['Int']['output'];
  /** Number of total available items. */
  total: Scalars['Int']['output'];
};

export type Permission = {
  __typename?: 'Permission';
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  guard_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  roles?: Maybe<Array<Maybe<Role>>>;
  updated_at: Scalars['DateTime']['output'];
};

export type PermissionInput = {
  guard_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
};

/** A paginated list of Permission items. */
export type PermissionPaginator = {
  __typename?: 'PermissionPaginator';
  /** A list of Permission items. */
  data: Array<Permission>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type Purok = {
  __typename?: 'Purok';
  barangay?: Maybe<Barangay>;
  created_at: Scalars['DateTime']['output'];
  households?: Maybe<Array<Maybe<Household>>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  residents?: Maybe<Array<Maybe<Resident>>>;
  updated_at: Scalars['DateTime']['output'];
};

export type PurokInput = {
  barangay?: InputMaybe<ConnectBarangayRelation>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** A paginated list of Purok items. */
export type PurokPaginator = {
  __typename?: 'PurokPaginator';
  /** A list of Purok items. */
  data: Array<Purok>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type Query = {
  __typename?: 'Query';
  attendancePaginate: AttendancePaginator;
  attendances: Array<Maybe<Attendance>>;
  barangays: Array<Maybe<Barangay>>;
  barangaysCount: Scalars['Int']['output'];
  barangaysPaginate: BarangayPaginator;
  blotters: Array<Maybe<Blotter>>;
  blottersCount: Scalars['Int']['output'];
  blottersPaginate: BlotterPaginator;
  blottersThisWeekCount: Scalars['Int']['output'];
  contact?: Maybe<Contact>;
  contacts: ContactPaginator;
  documents: Array<Maybe<Document>>;
  documentsCount: Scalars['Int']['output'];
  documentsPaginate: DocumentPaginator;
  households: Array<Maybe<Household>>;
  householdsCount: Scalars['Int']['output'];
  householdsPaginate: HouseholdPaginator;
  me: User;
  message?: Maybe<Message>;
  messages: MessagePaginator;
  messagesCount: Scalars['Int']['output'];
  officials: Array<Maybe<Official>>;
  officialsCount: Scalars['Int']['output'];
  officialsPaginate: OfficialPaginator;
  permissions: Array<Maybe<Permission>>;
  permissionsPaginate: PermissionPaginator;
  puroks: Array<Maybe<Purok>>;
  puroksCount: Scalars['Int']['output'];
  puroksPaginate: PurokPaginator;
  residents: Array<Maybe<Resident>>;
  residentsCount: Scalars['Int']['output'];
  residentsPaginate: ResidentPaginator;
  roles: Array<Maybe<Role>>;
  rolesPaginate: RolePaginator;
  tasks: Array<Maybe<Task>>;
  tasksCount: Scalars['Int']['output'];
  tasksPaginate: TaskPaginator;
  totalPendingDocuments: Scalars['Int']['output'];
  totalPendingNewToday: Scalars['Int']['output'];
  users: Array<Maybe<User>>;
  usersCount: Scalars['Int']['output'];
  usersPaginate: UserPaginator;
};


export type QueryAttendancePaginateArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
};


export type QueryBarangaysPaginateArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
};


export type QueryBlottersPaginateArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
};


export type QueryContactArgs = {
  id: Scalars['ID']['input'];
};


export type QueryContactsArgs = {
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDocumentsPaginateArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
  where?: InputMaybe<QueryDocumentsPaginateWhereWhereConditions>;
};


export type QueryHouseholdsPaginateArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
};


export type QueryMessageArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMessagesArgs = {
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<QueryMessagesWhereWhereConditions>;
};


export type QueryOfficialsPaginateArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
};


export type QueryPermissionsPaginateArgs = {
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
};


export type QueryPuroksPaginateArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
};


export type QueryResidentsPaginateArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
};


export type QueryRolesPaginateArgs = {
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
};


export type QueryTasksPaginateArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
  where?: InputMaybe<QueryTasksPaginateWhereWhereConditions>;
};


export type QueryUsersPaginateArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
};

/** Allowed column names for Query.documentsPaginate.where. */
export enum QueryDocumentsPaginateWhereColumn {
  CreatedBy = 'CREATED_BY'
}

/** Dynamic WHERE conditions for the `where` argument of the query `documentsPaginate`. */
export type QueryDocumentsPaginateWhereWhereConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<QueryDocumentsPaginateWhereWhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<QueryDocumentsPaginateWhereWhereConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<QueryDocumentsPaginateWhereWhereConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<QueryDocumentsPaginateWhereColumn>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/** Dynamic HAS conditions for WHERE conditions for the `where` argument of the query `documentsPaginate`. */
export type QueryDocumentsPaginateWhereWhereConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars['Int']['input']>;
  /** Additional condition logic. */
  condition?: InputMaybe<QueryDocumentsPaginateWhereWhereConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars['String']['input'];
};

/** Allowed column names for Query.messages.where. */
export enum QueryMessagesWhereColumn {
  ReceiverId = 'RECEIVER_ID',
  SenderId = 'SENDER_ID'
}

/** Dynamic WHERE conditions for the `where` argument of the query `messages`. */
export type QueryMessagesWhereWhereConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<QueryMessagesWhereWhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<QueryMessagesWhereWhereConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<QueryMessagesWhereWhereConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<QueryMessagesWhereColumn>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/** Dynamic HAS conditions for WHERE conditions for the `where` argument of the query `messages`. */
export type QueryMessagesWhereWhereConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars['Int']['input']>;
  /** Additional condition logic. */
  condition?: InputMaybe<QueryMessagesWhereWhereConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars['String']['input'];
};

/** Allowed column names for Query.tasksPaginate.where. */
export enum QueryTasksPaginateWhereColumn {
  CreatedBy = 'CREATED_BY',
  Status = 'STATUS'
}

/** Dynamic WHERE conditions for the `where` argument of the query `tasksPaginate`. */
export type QueryTasksPaginateWhereWhereConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<QueryTasksPaginateWhereWhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<QueryTasksPaginateWhereWhereConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<QueryTasksPaginateWhereWhereConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<QueryTasksPaginateWhereColumn>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/** Dynamic HAS conditions for WHERE conditions for the `where` argument of the query `tasksPaginate`. */
export type QueryTasksPaginateWhereWhereConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars['Int']['input']>;
  /** Additional condition logic. */
  condition?: InputMaybe<QueryTasksPaginateWhereWhereConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars['String']['input'];
};

export type RegisterInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  middle_name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<ConnectRolesRelation>;
};

export type Resident = {
  __typename?: 'Resident';
  barangay?: Maybe<Barangay>;
  birthdate?: Maybe<Scalars['DateTime']['output']>;
  blotters?: Maybe<Blotter>;
  citizenship: Scalars['String']['output'];
  civil_status: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  documents?: Maybe<Document>;
  email?: Maybe<Scalars['String']['output']>;
  first_name: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  household?: Maybe<Household>;
  id: Scalars['ID']['output'];
  last_name: Scalars['String']['output'];
  middle_name?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  officials?: Maybe<Official>;
  phone?: Maybe<Scalars['String']['output']>;
  purok?: Maybe<Purok>;
  suffix?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type ResidentInput = {
  barangay?: InputMaybe<ConnectBarangayRelation>;
  birthdate?: InputMaybe<Scalars['DateTime']['input']>;
  citizenship?: InputMaybe<Scalars['String']['input']>;
  civil_status?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  household?: InputMaybe<ConnectHouseholdRelation>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  middle_name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  purok?: InputMaybe<ConnectPurokRelation>;
  suffix?: InputMaybe<Scalars['String']['input']>;
};

/** A paginated list of Resident items. */
export type ResidentPaginator = {
  __typename?: 'ResidentPaginator';
  /** A list of Resident items. */
  data: Array<Resident>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type Role = {
  __typename?: 'Role';
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  guard_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissions?: Maybe<Array<Maybe<Permission>>>;
  updated_at: Scalars['DateTime']['output'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type RoleInput = {
  guard_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  permissions?: InputMaybe<ConnectPermissionsRelation>;
};

/** A paginated list of Role items. */
export type RolePaginator = {
  __typename?: 'RolePaginator';
  /** A list of Role items. */
  data: Array<Role>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** The available SQL operators that are used to filter query results. */
export enum SqlOperator {
  /** Whether a value is within a range of values (`BETWEEN`) */
  Between = 'BETWEEN',
  /** Equal operator (`=`) */
  Eq = 'EQ',
  /** Greater than operator (`>`) */
  Gt = 'GT',
  /** Greater than or equal operator (`>=`) */
  Gte = 'GTE',
  /** Whether a value is within a set of values (`IN`) */
  In = 'IN',
  /** Whether a value is not null (`IS NOT NULL`) */
  IsNotNull = 'IS_NOT_NULL',
  /** Whether a value is null (`IS NULL`) */
  IsNull = 'IS_NULL',
  /** Simple pattern matching (`LIKE`) */
  Like = 'LIKE',
  /** Less than operator (`<`) */
  Lt = 'LT',
  /** Less than or equal operator (`<=`) */
  Lte = 'LTE',
  /** Not equal operator (`!=`) */
  Neq = 'NEQ',
  /** Whether a value is not within a range of values (`NOT BETWEEN`) */
  NotBetween = 'NOT_BETWEEN',
  /** Whether a value is not within a set of values (`NOT IN`) */
  NotIn = 'NOT_IN',
  /** Negation of simple pattern matching (`NOT LIKE`) */
  NotLike = 'NOT_LIKE'
}

export type SortInput = {
  column?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
};

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

export type Task = {
  __typename?: 'Task';
  createdBy: User;
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  order?: Maybe<Scalars['Float']['output']>;
  priority?: Maybe<TaskPriority>;
  status?: Maybe<TaskStatus>;
  title: Scalars['String']['output'];
  updatedBy?: Maybe<User>;
  updated_at: Scalars['DateTime']['output'];
};

export type TaskInput = {
  createdBy?: InputMaybe<ConnectUserRelation>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<Scalars['Float']['input']>;
  priority?: InputMaybe<TaskPriority>;
  status?: InputMaybe<TaskStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedBy?: InputMaybe<ConnectUserRelation>;
  updated_at?: InputMaybe<Scalars['DateTime']['input']>;
};

/** A paginated list of Task items. */
export type TaskPaginator = {
  __typename?: 'TaskPaginator';
  /** A list of Task items. */
  data: Array<Task>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export enum TaskPriority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export enum TaskStatus {
  Done = 'DONE',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO'
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type User = {
  __typename?: 'User';
  attendances?: Maybe<Array<Maybe<Attendance>>>;
  contacts?: Maybe<Array<Maybe<Contact>>>;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  documents?: Maybe<Array<Maybe<Document>>>;
  email: Scalars['String']['output'];
  face_descriptors?: Maybe<Scalars['JSON']['output']>;
  first_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  is_active?: Maybe<Scalars['Boolean']['output']>;
  is_admin: Scalars['Boolean']['output'];
  last_name: Scalars['String']['output'];
  messages?: Maybe<Array<Maybe<Message>>>;
  middle_name?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  permissions?: Maybe<Array<Maybe<Permission>>>;
  phone?: Maybe<Scalars['String']['output']>;
  resident?: Maybe<Resident>;
  roles: Array<Maybe<Role>>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  updated_at: Scalars['DateTime']['output'];
  usersCount?: Maybe<Scalars['Int']['output']>;
};

export type UserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  face_descriptors?: InputMaybe<Scalars['JSON']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  middle_name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  resident?: InputMaybe<ConnectResidentRelation>;
  roles?: InputMaybe<ConnectRolesRelation>;
};

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** A list of User items. */
  data: Array<User>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Dynamic WHERE conditions for queries. */
export type WhereConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<WhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<WhereConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<WhereConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<Scalars['String']['input']>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/** Dynamic HAS conditions for WHERE condition queries. */
export type WhereConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars['Int']['input']>;
  /** Additional condition logic. */
  condition?: InputMaybe<WhereConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars['String']['input'];
};

export type AttendancePaginateQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
  filter?: InputMaybe<Array<InputMaybe<FilterInput>> | InputMaybe<FilterInput>>;
}>;


export type AttendancePaginateQuery = { __typename?: 'Query', attendancePaginate: { __typename?: 'AttendancePaginator', data: Array<(
      { __typename?: 'Attendance' }
      & { ' $fragmentRefs'?: { 'AttendanceFragment': AttendanceFragment } }
    )>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, perPage: number, total: number } } };

export type UpsertAttendanceMutationVariables = Exact<{
  input: AttendanceInput;
}>;


export type UpsertAttendanceMutation = { __typename?: 'Mutation', upsertAttendance: (
    { __typename?: 'Attendance' }
    & { ' $fragmentRefs'?: { 'AttendanceFragment': AttendanceFragment } }
  ) };

export type DeleteAttendanceMutationVariables = Exact<{
  id?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type DeleteAttendanceMutation = { __typename?: 'Mutation', deleteAttendance?: Array<{ __typename?: 'Attendance', id: string } | null> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, name?: string | null, email: string, is_admin: boolean, roles: Array<{ __typename?: 'Role', name: string } | null>, permissions?: Array<{ __typename?: 'Permission', name: string } | null> | null } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, first_name: string, last_name: string, middle_name?: string | null, name?: string | null, email: string, is_admin: boolean, roles: Array<{ __typename?: 'Role', id: string, name: string } | null>, permissions?: Array<{ __typename?: 'Permission', id: string, name: string } | null> | null } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'LogoutResponse', message: string } | null };

export type RequestOtpMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
}>;


export type RequestOtpMutation = { __typename?: 'Mutation', requestOtp?: { __typename?: 'OtpResponse', status?: boolean | null, remarks?: string | null, error?: string | null, expiry?: number | null, session_key?: string | null } | null };

export type VerifyOtpMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
  sessionKey: Scalars['String']['input'];
  otp: Scalars['String']['input'];
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOtp?: { __typename?: 'OtpResponse', status?: boolean | null, remarks?: string | null, error?: string | null, expiry?: number | null, user?: { __typename?: 'User', id: string, email: string } | null } | null };

export type BarangaysPaginateQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
  filter?: InputMaybe<Array<InputMaybe<FilterInput>> | InputMaybe<FilterInput>>;
}>;


export type BarangaysPaginateQuery = { __typename?: 'Query', barangaysPaginate: { __typename?: 'BarangayPaginator', data: Array<(
      { __typename?: 'Barangay' }
      & { ' $fragmentRefs'?: { 'BarangayFragment': BarangayFragment } }
    )>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, perPage: number, total: number } } };

export type UpsertBarangayMutationVariables = Exact<{
  input: BarangayInput;
}>;


export type UpsertBarangayMutation = { __typename?: 'Mutation', upsertBarangay: (
    { __typename?: 'Barangay' }
    & { ' $fragmentRefs'?: { 'BarangayFragment': BarangayFragment } }
  ) };

export type DeleteBarangayMutationVariables = Exact<{
  id?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type DeleteBarangayMutation = { __typename?: 'Mutation', deleteBarangay?: Array<{ __typename?: 'Barangay', id: string } | null> | null };

export type BarangaysCountQueryVariables = Exact<{ [key: string]: never; }>;


export type BarangaysCountQuery = { __typename?: 'Query', barangaysCount: number };

export type BlottersPaginateQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
  filter?: InputMaybe<Array<InputMaybe<FilterInput>> | InputMaybe<FilterInput>>;
}>;


export type BlottersPaginateQuery = { __typename?: 'Query', blottersPaginate: { __typename?: 'BlotterPaginator', data: Array<(
      { __typename?: 'Blotter' }
      & { ' $fragmentRefs'?: { 'BlotterFragment': BlotterFragment } }
    )>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, perPage: number, total: number } } };

export type UpsertBlotterMutationVariables = Exact<{
  input: BlotterInput;
}>;


export type UpsertBlotterMutation = { __typename?: 'Mutation', upsertBlotter: (
    { __typename?: 'Blotter' }
    & { ' $fragmentRefs'?: { 'BlotterFragment': BlotterFragment } }
  ) };

export type DeleteBlotterMutationVariables = Exact<{
  id?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type DeleteBlotterMutation = { __typename?: 'Mutation', deleteBlotter?: Array<{ __typename?: 'Blotter', id: string } | null> | null };

export type BlottersCountQueryVariables = Exact<{ [key: string]: never; }>;


export type BlottersCountQuery = { __typename?: 'Query', blottersCount: number };

export type BlottersThisWeekCountQueryVariables = Exact<{ [key: string]: never; }>;


export type BlottersThisWeekCountQuery = { __typename?: 'Query', blottersThisWeekCount: number };

export type DocumentsPaginateQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
  filter?: InputMaybe<Array<InputMaybe<FilterInput>> | InputMaybe<FilterInput>>;
  whereConditions?: InputMaybe<QueryDocumentsPaginateWhereWhereConditions>;
}>;


export type DocumentsPaginateQuery = { __typename?: 'Query', documentsPaginate: { __typename?: 'DocumentPaginator', data: Array<(
      { __typename?: 'Document' }
      & { ' $fragmentRefs'?: { 'DocumentFragment': DocumentFragment } }
    )>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, perPage: number, total: number } } };

export type RecentDocumentsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentDocumentsQuery = { __typename?: 'Query', documentsPaginate: { __typename?: 'DocumentPaginator', data: Array<{ __typename?: 'Document', id: string, doc_no: string, type: string, status: string, updated_at: any, resident: { __typename?: 'Resident', name?: string | null } }> } };

export type UpsertDocumentMutationVariables = Exact<{
  input: DocumentInput;
}>;


export type UpsertDocumentMutation = { __typename?: 'Mutation', upsertDocument?: (
    { __typename?: 'Document' }
    & { ' $fragmentRefs'?: { 'DocumentFragment': DocumentFragment } }
  ) | null };

export type DeleteDocumentMutationVariables = Exact<{
  id?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type DeleteDocumentMutation = { __typename?: 'Mutation', deleteDocument?: Array<{ __typename?: 'Document', id: string } | null> | null };

export type DocumentsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type DocumentsCountQuery = { __typename?: 'Query', documentsCount: number };

export type TotalPendingDocumentsQueryVariables = Exact<{ [key: string]: never; }>;


export type TotalPendingDocumentsQuery = { __typename?: 'Query', totalPendingDocuments: number };

export type TotalPendingNewTodayQueryVariables = Exact<{ [key: string]: never; }>;


export type TotalPendingNewTodayQuery = { __typename?: 'Query', totalPendingNewToday: number };

export type UserFragment = { __typename?: 'User', id: string, name?: string | null, first_name: string, middle_name?: string | null, last_name: string, email: string, phone?: string | null, password: string, is_admin: boolean, face_descriptors?: any | null, is_active?: boolean | null, created_at: any, updated_at: any, deleted_at?: any | null, roles: Array<{ __typename?: 'Role', id: string, name: string } | null>, resident?: { __typename?: 'Resident', id: string } | null } & { ' $fragmentName'?: 'UserFragment' };

export type HouseholdFragment = { __typename?: 'Household', id: string, household_no: string, address?: string | null, created_at: any, updated_at: any, purok?: { __typename?: 'Purok', id: string, name: string } | null, barangay?: { __typename?: 'Barangay', id: string, name: string } | null } & { ' $fragmentName'?: 'HouseholdFragment' };

export type ResidentFragment = { __typename?: 'Resident', id: string, name?: string | null, first_name: string, middle_name?: string | null, last_name: string, suffix?: string | null, birthdate?: any | null, gender: string, civil_status: string, citizenship: string, phone?: string | null, email?: string | null, created_at: any, updated_at: any, barangay?: { __typename?: 'Barangay', id: string, name: string } | null, household?: { __typename?: 'Household', id: string, household_no: string, address?: string | null } | null, purok?: { __typename?: 'Purok', id: string, name: string } | null } & { ' $fragmentName'?: 'ResidentFragment' };

export type MessageFragment = { __typename?: 'Message', id: string, message: string, messagesCount?: number | null, created_at: any, updated_at: any, sender?: { __typename?: 'User', id: string, name?: string | null } | null, receiver?: { __typename?: 'User', id: string, name?: string | null } | null } & { ' $fragmentName'?: 'MessageFragment' };

export type RoleFragment = { __typename?: 'Role', id: string, name: string, guard_name: string, created_at: any, updated_at: any, users?: Array<{ __typename?: 'User', id: string, name?: string | null } | null> | null, permissions?: Array<{ __typename?: 'Permission', id: string, name: string } | null> | null } & { ' $fragmentName'?: 'RoleFragment' };

export type PermissionFragment = { __typename?: 'Permission', id: string, name: string, guard_name: string, created_at: any, updated_at: any } & { ' $fragmentName'?: 'PermissionFragment' };

export type BlotterFragment = { __typename?: 'Blotter', id: string, case_no: string, complaint: string, status: string, details: string, incident_date: any, created_at: any, updated_at: any, complainant?: { __typename?: 'Resident', id: string, name?: string | null } | null, respondent?: { __typename?: 'Resident', id: string, name?: string | null } | null, barangay?: { __typename?: 'Barangay', id: string, name: string } | null } & { ' $fragmentName'?: 'BlotterFragment' };

export type OfficialFragment = { __typename?: 'Official', id: string, position: string, term_start: any, term_end?: any | null, barangay?: { __typename?: 'Barangay', id: string, name: string } | null, resident?: { __typename?: 'Resident', id: string, name?: string | null } | null } & { ' $fragmentName'?: 'OfficialFragment' };

export type DocumentFragment = { __typename?: 'Document', id: string, doc_no: string, type: string, category: string, status: string, requested_at?: any | null, issued_at?: any | null, valid_until?: any | null, created_at: any, updated_at: any, resident: { __typename?: 'Resident', id: string, name?: string | null }, createdBy: { __typename?: 'User', id: string, name?: string | null }, updatedBy?: { __typename?: 'User', id: string, name?: string | null } | null } & { ' $fragmentName'?: 'DocumentFragment' };

export type BarangayFragment = { __typename?: 'Barangay', id: string, name: string, population?: number | null, created_at: any, updated_at: any, official?: { __typename?: 'Official', id: string, position: string, resident?: { __typename?: 'Resident', id: string, name?: string | null } | null } | null } & { ' $fragmentName'?: 'BarangayFragment' };

export type TaskFragment = { __typename?: 'Task', id: string, title: string, description?: string | null, status?: TaskStatus | null, priority?: TaskPriority | null, order?: number | null, created_at: any, updated_at: any, createdBy: { __typename?: 'User', id: string, name?: string | null }, updatedBy?: { __typename?: 'User', id: string, name?: string | null } | null } & { ' $fragmentName'?: 'TaskFragment' };

export type AttendanceFragment = { __typename?: 'Attendance', id: string, date?: any | null, am_time_in?: any | null, am_time_out?: any | null, pm_time_in?: any | null, pm_time_out?: any | null, extra_time_in_1?: any | null, extra_time_out_1?: any | null, extra_time_in_2?: any | null, extra_time_out_2?: any | null, created_at: any, updated_at: any, user: { __typename?: 'User', id: string, name?: string | null } } & { ' $fragmentName'?: 'AttendanceFragment' };

export type HouseholdsPaginateQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
}>;


export type HouseholdsPaginateQuery = { __typename?: 'Query', householdsPaginate: { __typename?: 'HouseholdPaginator', data: Array<(
      { __typename?: 'Household' }
      & { ' $fragmentRefs'?: { 'HouseholdFragment': HouseholdFragment } }
    )>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, perPage: number, total: number } } };

export type UpsertHouseholdMutationVariables = Exact<{
  input: HouseholdInput;
}>;


export type UpsertHouseholdMutation = { __typename?: 'Mutation', upsertHousehold: (
    { __typename?: 'Household' }
    & { ' $fragmentRefs'?: { 'HouseholdFragment': HouseholdFragment } }
  ) };

export type DeleteHouseholdMutationVariables = Exact<{
  id?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type DeleteHouseholdMutation = { __typename?: 'Mutation', deleteHousehold?: Array<{ __typename?: 'Household', id: string } | null> | null };

export type MessagesQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  sender?: InputMaybe<Scalars['Mixed']['input']>;
  receiver?: InputMaybe<Scalars['Mixed']['input']>;
}>;


export type MessagesQuery = { __typename?: 'Query', messages: { __typename?: 'MessagePaginator', data: Array<(
      { __typename?: 'Message' }
      & { ' $fragmentRefs'?: { 'MessageFragment': MessageFragment } }
    )>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, perPage: number, total: number } } };

export type UpsertMessageMutationVariables = Exact<{
  input: MessageInput;
}>;


export type UpsertMessageMutation = { __typename?: 'Mutation', upsertMessage: { __typename?: 'Message', id: string, message: string, sender?: { __typename?: 'User', id: string } | null, receiver?: { __typename?: 'User', id: string } | null } };

export type OfficialsPaginateQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
}>;


export type OfficialsPaginateQuery = { __typename?: 'Query', officialsPaginate: { __typename?: 'OfficialPaginator', data: Array<(
      { __typename?: 'Official' }
      & { ' $fragmentRefs'?: { 'OfficialFragment': OfficialFragment } }
    )>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, perPage: number, total: number } } };

export type UpsertOfficialMutationVariables = Exact<{
  input: OfficialInput;
}>;


export type UpsertOfficialMutation = { __typename?: 'Mutation', upsertOfficial: (
    { __typename?: 'Official' }
    & { ' $fragmentRefs'?: { 'OfficialFragment': OfficialFragment } }
  ) };

export type DeleteOfficialMutationVariables = Exact<{
  id?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type DeleteOfficialMutation = { __typename?: 'Mutation', deleteOfficial?: Array<{ __typename?: 'Official', id: string } | null> | null };

export type PermissionsPaginateQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
}>;


export type PermissionsPaginateQuery = { __typename?: 'Query', permissionsPaginate: { __typename?: 'PermissionPaginator', data: Array<(
      { __typename?: 'Permission' }
      & { ' $fragmentRefs'?: { 'PermissionFragment': PermissionFragment } }
    )>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, perPage: number, total: number } } };

export type UpsertPermissionMutationVariables = Exact<{
  input: PermissionInput;
}>;


export type UpsertPermissionMutation = { __typename?: 'Mutation', upsertPermission: (
    { __typename?: 'Permission' }
    & { ' $fragmentRefs'?: { 'PermissionFragment': PermissionFragment } }
  ) };

export type DeletePermissionMutationVariables = Exact<{
  id?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type DeletePermissionMutation = { __typename?: 'Mutation', deletePermission?: Array<{ __typename?: 'Permission', id: string } | null> | null };

export type PuroksPaginateQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
}>;


export type PuroksPaginateQuery = { __typename?: 'Query', puroksPaginate: { __typename?: 'PurokPaginator', data: Array<{ __typename?: 'Purok', id: string, name: string, created_at: any, updated_at: any, barangay?: { __typename?: 'Barangay', id: string, name: string } | null }>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, perPage: number, total: number } } };

export type UpsertPurokMutationVariables = Exact<{
  input: PurokInput;
}>;


export type UpsertPurokMutation = { __typename?: 'Mutation', upsertPurok: { __typename?: 'Purok', id: string, name: string, created_at: any, updated_at: any, barangay?: { __typename?: 'Barangay', id: string, name: string } | null } };

export type DeletePurokMutationVariables = Exact<{
  id?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type DeletePurokMutation = { __typename?: 'Mutation', deletePurok?: Array<{ __typename?: 'Purok', id: string } | null> | null };

export type ResidentsPaginateQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
  filter?: InputMaybe<Array<InputMaybe<FilterInput>> | InputMaybe<FilterInput>>;
}>;


export type ResidentsPaginateQuery = { __typename?: 'Query', residentsPaginate: { __typename?: 'ResidentPaginator', data: Array<(
      { __typename?: 'Resident' }
      & { ' $fragmentRefs'?: { 'ResidentFragment': ResidentFragment } }
    )>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, perPage: number, total: number } } };

export type UpsertResidentMutationVariables = Exact<{
  input: ResidentInput;
}>;


export type UpsertResidentMutation = { __typename?: 'Mutation', upsertResident: (
    { __typename?: 'Resident' }
    & { ' $fragmentRefs'?: { 'ResidentFragment': ResidentFragment } }
  ) };

export type DeleteResidentMutationVariables = Exact<{
  id?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type DeleteResidentMutation = { __typename?: 'Mutation', deleteResident?: Array<{ __typename?: 'Resident', id: string } | null> | null };

export type ResidentsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type ResidentsCountQuery = { __typename?: 'Query', residentsCount: number };

export type RolesPaginateQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
}>;


export type RolesPaginateQuery = { __typename?: 'Query', rolesPaginate: { __typename?: 'RolePaginator', data: Array<(
      { __typename?: 'Role' }
      & { ' $fragmentRefs'?: { 'RoleFragment': RoleFragment } }
    )>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, perPage: number, total: number } } };

export type UpsertRoleMutationVariables = Exact<{
  input: RoleInput;
}>;


export type UpsertRoleMutation = { __typename?: 'Mutation', upsertRole: (
    { __typename?: 'Role' }
    & { ' $fragmentRefs'?: { 'RoleFragment': RoleFragment } }
  ) };

export type DeleteRoleMutationVariables = Exact<{
  id?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type DeleteRoleMutation = { __typename?: 'Mutation', deleteRole?: Array<{ __typename?: 'Role', id: string } | null> | null };

export type TasksPaginateQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
  filter?: InputMaybe<Array<InputMaybe<FilterInput>> | InputMaybe<FilterInput>>;
  whereConditions?: InputMaybe<QueryTasksPaginateWhereWhereConditions>;
}>;


export type TasksPaginateQuery = { __typename?: 'Query', tasksPaginate: { __typename?: 'TaskPaginator', data: Array<(
      { __typename?: 'Task' }
      & { ' $fragmentRefs'?: { 'TaskFragment': TaskFragment } }
    )>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, perPage: number, total: number } } };

export type UpsertTaskMutationVariables = Exact<{
  input: TaskInput;
}>;


export type UpsertTaskMutation = { __typename?: 'Mutation', upsertTask?: (
    { __typename?: 'Task' }
    & { ' $fragmentRefs'?: { 'TaskFragment': TaskFragment } }
  ) | null };

export type DeleteTaskMutationVariables = Exact<{
  id: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask?: boolean | null };

export type TasksCountQueryVariables = Exact<{ [key: string]: never; }>;


export type TasksCountQuery = { __typename?: 'Query', tasksCount: number };

export type UsersPaginateQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortInput>;
  filter?: InputMaybe<Array<InputMaybe<FilterInput>> | InputMaybe<FilterInput>>;
}>;


export type UsersPaginateQuery = { __typename?: 'Query', usersPaginate: { __typename?: 'UserPaginator', data: Array<(
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserFragment': UserFragment } }
    )>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, perPage: number, total: number } } };

export type UpsertUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type UpsertUserMutation = { __typename?: 'Mutation', upsertUser: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragment': UserFragment } }
  ) };

export type DeleteUserMutationVariables = Exact<{
  id?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser?: Array<{ __typename?: 'User', id: string } | null> | null };

export type RestoreUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RestoreUserMutation = { __typename?: 'Mutation', restoreUser: { __typename?: 'User', id: string } };

export type UpdateUserStatusMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  is_active: Scalars['Boolean']['input'];
}>;


export type UpdateUserStatusMutation = { __typename?: 'Mutation', updateUserStatus?: { __typename?: 'User', id: string, is_active?: boolean | null } | null };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragment': UserFragment } }
  ) | null };

export type UsersCountQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersCountQuery = { __typename?: 'Query', usersCount: number };

export type RegisterFaceMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  descriptor: Array<Scalars['Float']['input']> | Scalars['Float']['input'];
}>;


export type RegisterFaceMutation = { __typename?: 'Mutation', registerFace?: boolean | null };

export type RecognizeFaceMutationVariables = Exact<{
  descriptor: Array<Scalars['Float']['input']> | Scalars['Float']['input'];
}>;


export type RecognizeFaceMutation = { __typename?: 'Mutation', recognizeFace?: { __typename?: 'User', id: string, name?: string | null, roles: Array<{ __typename?: 'Role', name: string } | null> } | null };

export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"middle_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"is_admin"}},{"kind":"Field","name":{"kind":"Name","value":"face_descriptors"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"resident"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}}]}}]} as unknown as DocumentNode<UserFragment, unknown>;
export const HouseholdFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"household"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Household"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"household_no"}},{"kind":"Field","name":{"kind":"Name","value":"purok"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"barangay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<HouseholdFragment, unknown>;
export const ResidentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resident"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Resident"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"middle_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"suffix"}},{"kind":"Field","name":{"kind":"Name","value":"birthdate"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"civil_status"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"barangay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"household"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"household_no"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}},{"kind":"Field","name":{"kind":"Name","value":"purok"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<ResidentFragment, unknown>;
export const MessageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"message"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"receiver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<MessageFragment, unknown>;
export const RoleFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"role"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"guard_name"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<RoleFragment, unknown>;
export const PermissionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"permission"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Permission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"guard_name"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<PermissionFragment, unknown>;
export const BlotterFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"blotter"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Blotter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"case_no"}},{"kind":"Field","name":{"kind":"Name","value":"complaint"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"incident_date"}},{"kind":"Field","name":{"kind":"Name","value":"complainant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"respondent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"barangay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<BlotterFragment, unknown>;
export const OfficialFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"official"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Official"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"term_start"}},{"kind":"Field","name":{"kind":"Name","value":"term_end"}},{"kind":"Field","name":{"kind":"Name","value":"barangay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"resident"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<OfficialFragment, unknown>;
export const DocumentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"document"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Document"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"doc_no"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"requested_at"}},{"kind":"Field","name":{"kind":"Name","value":"issued_at"}},{"kind":"Field","name":{"kind":"Name","value":"valid_until"}},{"kind":"Field","name":{"kind":"Name","value":"resident"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<DocumentFragment, unknown>;
export const BarangayFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"barangay"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Barangay"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resident"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"Field","name":{"kind":"Name","value":"population"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<BarangayFragment, unknown>;
export const TaskFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"task"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<TaskFragment, unknown>;
export const AttendanceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"attendance"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Attendance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"am_time_in"}},{"kind":"Field","name":{"kind":"Name","value":"am_time_out"}},{"kind":"Field","name":{"kind":"Name","value":"pm_time_in"}},{"kind":"Field","name":{"kind":"Name","value":"pm_time_out"}},{"kind":"Field","name":{"kind":"Name","value":"extra_time_in_1"}},{"kind":"Field","name":{"kind":"Name","value":"extra_time_out_1"}},{"kind":"Field","name":{"kind":"Name","value":"extra_time_in_2"}},{"kind":"Field","name":{"kind":"Name","value":"extra_time_out_2"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<AttendanceFragment, unknown>;
export const AttendancePaginateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"attendancePaginate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attendancePaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"attendance"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"attendance"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Attendance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"am_time_in"}},{"kind":"Field","name":{"kind":"Name","value":"am_time_out"}},{"kind":"Field","name":{"kind":"Name","value":"pm_time_in"}},{"kind":"Field","name":{"kind":"Name","value":"pm_time_out"}},{"kind":"Field","name":{"kind":"Name","value":"extra_time_in_1"}},{"kind":"Field","name":{"kind":"Name","value":"extra_time_out_1"}},{"kind":"Field","name":{"kind":"Name","value":"extra_time_in_2"}},{"kind":"Field","name":{"kind":"Name","value":"extra_time_out_2"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<AttendancePaginateQuery, AttendancePaginateQueryVariables>;
export const UpsertAttendanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertAttendance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AttendanceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertAttendance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"attendance"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"attendance"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Attendance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"am_time_in"}},{"kind":"Field","name":{"kind":"Name","value":"am_time_out"}},{"kind":"Field","name":{"kind":"Name","value":"pm_time_in"}},{"kind":"Field","name":{"kind":"Name","value":"pm_time_out"}},{"kind":"Field","name":{"kind":"Name","value":"extra_time_in_1"}},{"kind":"Field","name":{"kind":"Name","value":"extra_time_out_1"}},{"kind":"Field","name":{"kind":"Name","value":"extra_time_in_2"}},{"kind":"Field","name":{"kind":"Name","value":"extra_time_out_2"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<UpsertAttendanceMutation, UpsertAttendanceMutationVariables>;
export const DeleteAttendanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteAttendance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAttendance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteAttendanceMutation, DeleteAttendanceMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"is_admin"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"middle_name"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"is_admin"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RequestOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"requestOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionKey"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"generated_session_key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionKey"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"session_key"}}]}}]}}]} as unknown as DocumentNode<RequestOtpMutation, RequestOtpMutationVariables>;
export const VerifyOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"generated_session_key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionKey"}}},{"kind":"Argument","name":{"kind":"Name","value":"otp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const BarangaysPaginateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"barangaysPaginate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"barangaysPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"barangay"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"barangay"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Barangay"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resident"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"Field","name":{"kind":"Name","value":"population"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<BarangaysPaginateQuery, BarangaysPaginateQueryVariables>;
export const UpsertBarangayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertBarangay"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BarangayInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertBarangay"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"barangay"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"barangay"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Barangay"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"official"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resident"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"Field","name":{"kind":"Name","value":"population"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<UpsertBarangayMutation, UpsertBarangayMutationVariables>;
export const DeleteBarangayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteBarangay"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBarangay"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteBarangayMutation, DeleteBarangayMutationVariables>;
export const BarangaysCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"barangaysCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"barangaysCount"}}]}}]} as unknown as DocumentNode<BarangaysCountQuery, BarangaysCountQueryVariables>;
export const BlottersPaginateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"blottersPaginate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blottersPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"blotter"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"blotter"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Blotter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"case_no"}},{"kind":"Field","name":{"kind":"Name","value":"complaint"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"incident_date"}},{"kind":"Field","name":{"kind":"Name","value":"complainant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"respondent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"barangay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<BlottersPaginateQuery, BlottersPaginateQueryVariables>;
export const UpsertBlotterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertBlotter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BlotterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertBlotter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"blotter"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"blotter"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Blotter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"case_no"}},{"kind":"Field","name":{"kind":"Name","value":"complaint"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"incident_date"}},{"kind":"Field","name":{"kind":"Name","value":"complainant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"respondent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"barangay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<UpsertBlotterMutation, UpsertBlotterMutationVariables>;
export const DeleteBlotterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteBlotter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBlotter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteBlotterMutation, DeleteBlotterMutationVariables>;
export const BlottersCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"blottersCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blottersCount"}}]}}]} as unknown as DocumentNode<BlottersCountQuery, BlottersCountQueryVariables>;
export const BlottersThisWeekCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"blottersThisWeekCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blottersThisWeekCount"}}]}}]} as unknown as DocumentNode<BlottersThisWeekCountQuery, BlottersThisWeekCountQueryVariables>;
export const DocumentsPaginateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"documentsPaginate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"whereConditions"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryDocumentsPaginateWhereWhereConditions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentsPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"whereConditions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"document"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"document"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Document"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"doc_no"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"requested_at"}},{"kind":"Field","name":{"kind":"Name","value":"issued_at"}},{"kind":"Field","name":{"kind":"Name","value":"valid_until"}},{"kind":"Field","name":{"kind":"Name","value":"resident"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<DocumentsPaginateQuery, DocumentsPaginateQueryVariables>;
export const RecentDocumentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"recentDocuments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentsPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"20"}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"column"},"value":{"kind":"StringValue","value":"UPDATED_AT","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"direction"},"value":{"kind":"StringValue","value":"DESC","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"doc_no"}},{"kind":"Field","name":{"kind":"Name","value":"resident"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]}}]} as unknown as DocumentNode<RecentDocumentsQuery, RecentDocumentsQueryVariables>;
export const UpsertDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"document"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"document"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Document"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"doc_no"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"requested_at"}},{"kind":"Field","name":{"kind":"Name","value":"issued_at"}},{"kind":"Field","name":{"kind":"Name","value":"valid_until"}},{"kind":"Field","name":{"kind":"Name","value":"resident"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<UpsertDocumentMutation, UpsertDocumentMutationVariables>;
export const DeleteDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteDocumentMutation, DeleteDocumentMutationVariables>;
export const DocumentsCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"documentsCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentsCount"}}]}}]} as unknown as DocumentNode<DocumentsCountQuery, DocumentsCountQueryVariables>;
export const TotalPendingDocumentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"totalPendingDocuments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalPendingDocuments"}}]}}]} as unknown as DocumentNode<TotalPendingDocumentsQuery, TotalPendingDocumentsQueryVariables>;
export const TotalPendingNewTodayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"totalPendingNewToday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalPendingNewToday"}}]}}]} as unknown as DocumentNode<TotalPendingNewTodayQuery, TotalPendingNewTodayQueryVariables>;
export const HouseholdsPaginateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"householdsPaginate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"householdsPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"household"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"household"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Household"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"household_no"}},{"kind":"Field","name":{"kind":"Name","value":"purok"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"barangay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<HouseholdsPaginateQuery, HouseholdsPaginateQueryVariables>;
export const UpsertHouseholdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertHousehold"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HouseholdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertHousehold"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"household"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"household"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Household"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"household_no"}},{"kind":"Field","name":{"kind":"Name","value":"purok"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"barangay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<UpsertHouseholdMutation, UpsertHouseholdMutationVariables>;
export const DeleteHouseholdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteHousehold"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteHousehold"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteHouseholdMutation, DeleteHouseholdMutationVariables>;
export const MessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"messages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sender"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Mixed"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiver"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Mixed"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"OR"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"AND"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"column"},"value":{"kind":"EnumValue","value":"SENDER_ID"}},{"kind":"ObjectField","name":{"kind":"Name","value":"operator"},"value":{"kind":"EnumValue","value":"EQ"}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sender"}}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"column"},"value":{"kind":"EnumValue","value":"RECEIVER_ID"}},{"kind":"ObjectField","name":{"kind":"Name","value":"operator"},"value":{"kind":"EnumValue","value":"EQ"}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiver"}}}]}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"AND"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"column"},"value":{"kind":"EnumValue","value":"SENDER_ID"}},{"kind":"ObjectField","name":{"kind":"Name","value":"operator"},"value":{"kind":"EnumValue","value":"EQ"}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiver"}}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"column"},"value":{"kind":"EnumValue","value":"RECEIVER_ID"}},{"kind":"ObjectField","name":{"kind":"Name","value":"operator"},"value":{"kind":"EnumValue","value":"EQ"}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sender"}}}]}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"message"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"receiver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<MessagesQuery, MessagesQueryVariables>;
export const UpsertMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"receiver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpsertMessageMutation, UpsertMessageMutationVariables>;
export const OfficialsPaginateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"officialsPaginate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"officialsPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"official"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"official"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Official"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"term_start"}},{"kind":"Field","name":{"kind":"Name","value":"term_end"}},{"kind":"Field","name":{"kind":"Name","value":"barangay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"resident"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<OfficialsPaginateQuery, OfficialsPaginateQueryVariables>;
export const UpsertOfficialDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertOfficial"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OfficialInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertOfficial"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"official"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"official"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Official"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"term_start"}},{"kind":"Field","name":{"kind":"Name","value":"term_end"}},{"kind":"Field","name":{"kind":"Name","value":"barangay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"resident"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpsertOfficialMutation, UpsertOfficialMutationVariables>;
export const DeleteOfficialDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteOfficial"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOfficial"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteOfficialMutation, DeleteOfficialMutationVariables>;
export const PermissionsPaginateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"permissionsPaginate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissionsPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"permission"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"permission"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Permission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"guard_name"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<PermissionsPaginateQuery, PermissionsPaginateQueryVariables>;
export const UpsertPermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertPermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PermissionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertPermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"permission"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"permission"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Permission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"guard_name"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<UpsertPermissionMutation, UpsertPermissionMutationVariables>;
export const DeletePermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deletePermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeletePermissionMutation, DeletePermissionMutationVariables>;
export const PuroksPaginateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"puroksPaginate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"puroksPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"barangay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]} as unknown as DocumentNode<PuroksPaginateQuery, PuroksPaginateQueryVariables>;
export const UpsertPurokDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertPurok"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PurokInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertPurok"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"barangay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<UpsertPurokMutation, UpsertPurokMutationVariables>;
export const DeletePurokDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deletePurok"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePurok"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeletePurokMutation, DeletePurokMutationVariables>;
export const ResidentsPaginateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"residentsPaginate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"residentsPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"resident"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resident"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Resident"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"middle_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"suffix"}},{"kind":"Field","name":{"kind":"Name","value":"birthdate"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"civil_status"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"barangay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"household"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"household_no"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}},{"kind":"Field","name":{"kind":"Name","value":"purok"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<ResidentsPaginateQuery, ResidentsPaginateQueryVariables>;
export const UpsertResidentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertResident"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResidentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertResident"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"resident"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resident"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Resident"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"middle_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"suffix"}},{"kind":"Field","name":{"kind":"Name","value":"birthdate"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"civil_status"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"barangay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"household"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"household_no"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}},{"kind":"Field","name":{"kind":"Name","value":"purok"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<UpsertResidentMutation, UpsertResidentMutationVariables>;
export const DeleteResidentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteResident"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteResident"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteResidentMutation, DeleteResidentMutationVariables>;
export const ResidentsCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"residentsCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"residentsCount"}}]}}]} as unknown as DocumentNode<ResidentsCountQuery, ResidentsCountQueryVariables>;
export const RolesPaginateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"rolesPaginate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rolesPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"role"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"guard_name"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<RolesPaginateQuery, RolesPaginateQueryVariables>;
export const UpsertRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"role"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"role"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Role"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"guard_name"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<UpsertRoleMutation, UpsertRoleMutationVariables>;
export const DeleteRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteRoleMutation, DeleteRoleMutationVariables>;
export const TasksPaginateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"tasksPaginate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"whereConditions"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryTasksPaginateWhereWhereConditions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasksPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"whereConditions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"task"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"task"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<TasksPaginateQuery, TasksPaginateQueryVariables>;
export const UpsertTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"task"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"task"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<UpsertTaskMutation, UpsertTaskMutationVariables>;
export const DeleteTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const TasksCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"tasksCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasksCount"}}]}}]} as unknown as DocumentNode<TasksCountQuery, TasksCountQueryVariables>;
export const UsersPaginateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"usersPaginate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"middle_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"is_admin"}},{"kind":"Field","name":{"kind":"Name","value":"face_descriptors"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"resident"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}}]}}]} as unknown as DocumentNode<UsersPaginateQuery, UsersPaginateQueryVariables>;
export const UpsertUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"middle_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"is_admin"}},{"kind":"Field","name":{"kind":"Name","value":"face_descriptors"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"resident"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}}]}}]} as unknown as DocumentNode<UpsertUserMutation, UpsertUserMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const RestoreUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"restoreUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restoreUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RestoreUserMutation, RestoreUserMutationVariables>;
export const UpdateUserStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUserStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"is_active"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"is_active"},"value":{"kind":"Variable","name":{"kind":"Name","value":"is_active"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}}]}}]}}]} as unknown as DocumentNode<UpdateUserStatusMutation, UpdateUserStatusMutationVariables>;
export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"registerUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"middle_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"is_admin"}},{"kind":"Field","name":{"kind":"Name","value":"face_descriptors"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"resident"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const UsersCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"usersCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersCount"}}]}}]} as unknown as DocumentNode<UsersCountQuery, UsersCountQueryVariables>;
export const RegisterFaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"registerFace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"descriptor"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerFace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"descriptor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"descriptor"}}}]}]}}]} as unknown as DocumentNode<RegisterFaceMutation, RegisterFaceMutationVariables>;
export const RecognizeFaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"recognizeFace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"descriptor"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recognizeFace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"descriptor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"descriptor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<RecognizeFaceMutation, RecognizeFaceMutationVariables>;