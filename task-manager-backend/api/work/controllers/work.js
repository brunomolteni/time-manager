"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    ctx.request.body.user = ctx.state.user.id;
    let entity = await strapi.services.work.create(ctx.request.body);
    return sanitizeEntity(entity, { mode: strapi.models.work });
  }
};
