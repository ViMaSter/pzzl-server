export interface ISessionDataConstructor
{
    new (parameters : any) : ISessionData;
}

export interface ISessionData
{
	Update(parameters : any) : void;
};