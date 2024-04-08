export interface Token {
  jwt:string
}

export interface LoginRequest{
  username:string,
  password:string
}

export interface Permission{
  id:number,
  name:string
}

export interface User{
  userID:number,
  name:string,
  surname:string,
  username:string,
  password:string,
  permissions:Permission[]
}

export interface Machine{
  id:number,
  name:string,
  status:string,
  user:User,
  active:boolean,
  dateCreated: string,
  mySomething: boolean,
  myCircle: boolean
}

export interface ErrorMessage{
  id:number,
  machine:Machine,
  userId:number,
  operationFailed:string,
  messageError:string,
  dateError:string
}


