exports.getAllUsers = (req, res) => {
    try {
        res.status(200).json({
            completed: true,
            message: "All users fetched successfully"
        })
    } catch (error) {
        res.status(500).json({
            completed: true,
            message: "All users fetched successfully"
        })
    }
}