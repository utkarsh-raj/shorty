export default (fn: any) => (req: any, res: any, next: any, ...args: any[]) => {
    const fnReturn = fn(req, res, next, ...args)
    return Promise.resolve(fnReturn).catch(next)
}
