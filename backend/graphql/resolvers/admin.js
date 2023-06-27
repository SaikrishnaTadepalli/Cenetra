const Admin = require("../../models/admin");

const getNewNum = (numDigits) => {
  const min = 10 ** (numDigits - 1);
  const max = 10 ** numDigits - 1;
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
};

const CreateAdminNumber = async () => {
  let number = getNewNum(8);

  while (true) {
    const fetchedAdmin = await Admin.findOne({
      adminNumber: number,
    });

    if (!fetchedAdmin) {
      break;
    }

    number = getNewNum(8);
  }

  return number;
};

module.exports = {
  // Queries
  admins: async () => {
    try {
      const admins = await Admin.find().sort({ firstName: 1 });

      return admins.map((admin) => ({ ...admin._doc, _id: admin.id }));
    } catch (err) {
      throw err;
    }
  },

  adminById: async (args) => {
    try {
      const admin = await Admin.findById(args.adminId);

      if (!admin) {
        throw error("Admin does not exist.");
      }

      return {
        ...admin._doc,
        _id: admin.id,
      };
    } catch (err) {
      throw err;
    }
  },

  adminByAdminNumber: async (args) => {
    try {
      const admin = await Admin.findOne({
        adminNumber: args.adminNumber,
      });

      if (!admin) {
        throw error("Admin does not exist.");
      }

      return {
        ...admin._doc,
        _id: admin.id,
      };
    } catch (err) {
      throw err;
    }
  },

  // Mutations
  createAdmin: async (args) => {
    try {
      const existingAdmin = await Admin.findOne({
        phoneNumber: args.adminInput.phoneNumber,
      });

      if (existingAdmin) {
        throw new Error("Admin exists already.");
      }

      const newAdminNumber = await CreateAdminNumber();

      const newAdmin = new Admin({
        adminNumber: newAdminNumber,
        firstName: args.adminInput.firstName,
        lastName: args.adminInput.lastName,
        permissionLevel: args.adminInput.permissionLevel,
        phoneNumber: args.adminInput.phoneNumber,
      });

      const adminSaveRes = await newAdmin.save();

      return {
        ...adminSaveRes._doc,
        _id: adminSaveRes.id,
      };
    } catch (err) {
      throw err;
    }
  },
};
