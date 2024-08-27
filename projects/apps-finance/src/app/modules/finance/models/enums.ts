export enum paymentplace {
    Treasury=1,
    Bank=2,
  }

  export enum paymentmethodtype {
    Cash = 1,
    Check = 2,
    Transfer = 3,
    Visa = 4,
    Master = 5,
    Span = 6
  }
  export enum paymentMethodTypeString {
    Cash = "Cash",
    Check = "Check",
    Transfer = "Transfer",
    Visa = "Visa",
    Master = "Master",
    Span = "Span",
  }

  export enum commissiontype {
    Amount=1,
    Percent=2,
  }
  export enum paiedDropDown {
    customer ="customer",
    vendor ="vendor",
    other = "other"
  }
  export enum costCenterConfig {
    NotAllow ="NotAllow",
    Optional ="Optional",
    Mandatory = "Mandatory"
  }