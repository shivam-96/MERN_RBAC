const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  pageKey: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  write: {
    type: Boolean,
    default: false,
  },
});

PermissionSchema.index({ role: 1, pageKey: 1 }, { unique: true });

module.exports = mongoose.model("Permission", PermissionSchema);
