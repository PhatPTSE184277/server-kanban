const register = async (req: any, res: any) => {
    const body = req.body;
    try {
        console.log(body);
        res.status(200).json({
            message: 'Resgister',
            data: body,
        });
    } catch (error: any) {
        req.status(404).json({ 
            message: error.message 
        });
    }
};

export default register;