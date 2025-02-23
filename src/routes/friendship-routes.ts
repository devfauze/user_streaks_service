import { Router } from "express";
import { friendshipController } from "../controllers/friendship-controller";

const router = Router();

router.post("/friend-request", async (req, res, next) => {
    try{
     await friendshipController.sendFriendRequest(req, res)
    } catch(error){
        next(error)
    }
});

router.post("/accept-friend-request", async (req, res, next) => {
    try {
        await friendshipController.acceptFriendRequest(req, res);
    } catch (error) {
        next(error);
    }
});

router.post("/decline-friend-request", async (req, res, next) => {
    try {
        await friendshipController.declineFriendRequest(req, res);
    } catch (error) {
        next(error);
    }
});

router.get("/friends/:userId", async (req, res, next) => {
    try {
        await friendshipController.getFriends(req, res);
    } catch (error) {
        next(error);
    }
});

router.get("/pending-requests/:userId", async (req, res, next) => {
    try {
        await friendshipController.getPendingRequests(req, res)
    } catch(error){
        next(error)
    }
});
router.delete("/remove-friend", async (req, res, next) => {
  try {
      await friendshipController.removeFriend(req, res);
  }  catch (error) {
      next(error);
  }
}); 

export default router;
