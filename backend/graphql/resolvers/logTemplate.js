const LogTemplate = require("../../models/logTemplate");

const { transformLogTemplate } = require("./merge");

module.exports = {
  // Queries
  getAllLogTemplates: async () => {
    try {
      const logTemplates = await LogTemplate.find();

      return logTemplates.map((logTemplate) =>
        transformLogTemplate(logTemplate)
      );
    } catch (err) {
      throw err;
    }
  },

  getLogTemplate: async (args) => {
    try {
      const logTemplate = await LogTemplate.findById(args.logTemplateId);

      if (!logTemplate) {
        throw new Error("LogTemplate does not exist.");
      }

      return transformLogTemplate(logTemplate);
    } catch (err) {
      throw err;
    }
  },

  // Mutations
  createLogTemplate: async (args) => {
    try {
      const logTemplate = new LogTemplate({
        name: args.name,
        template: args.template,
      });

      const result = await logTemplate.save();

      return transformLogTemplate(result);
    } catch (err) {
      throw err;
    }
  },

  editLogTemplate: async (args) => {
    try {
      const logTemplate = await LogTemplate.findById(args.logTemplateId);

      if (!logTemplate) {
        throw new Error("LogTemplate does not exist.");
      }

      logTemplate.name = args.name;
      logTemplate.template = args.template;

      const result = await logTemplate.save();

      return transformLogTemplate(result);
    } catch (err) {
      throw err;
    }
  },

  deleteLogTemplate: async (args) => {
    try {
      // Implementation
      const logTemplate = await LogTemplate.findByIdAndRemove(
        args.logTemplateId
      );

      if (!logTemplate) {
        throw new Error("LogTemplate does not exist.");
      }

      const result = await logTemplate.save();

      return transformLogTemplate(result);
    } catch (err) {
      throw err;
    }
  },
};
