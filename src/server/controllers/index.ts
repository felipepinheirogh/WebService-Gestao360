class IndexController {
    public getIndex(req: Request, res: Response): void {
        res.send('Welcome to the ERP Cloud Application');
    }
}

export default IndexController;