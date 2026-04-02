import type { Request, Response } from "express";

class HealthController {
    handleHealthCheck(req: Request, res: Response) {
        return res.status(200).json({ status: "ok" });
    }
}

export default HealthController;
