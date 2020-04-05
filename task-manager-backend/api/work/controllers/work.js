"use strict";
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.work.search({
        ...ctx.query,
        user: ctx.state.user.id,
      });
    } else {
      entities = await strapi.services.work.find({
        ...ctx.query,
        user: ctx.state.user.id,
      });
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.work })
    );
  },
  async create(ctx) {
    let entity;

    ctx.request.body.user = ctx.state.user.id;
    entity = await strapi.services.work.create(ctx.request.body);

    return sanitizeEntity(entity, { model: strapi.models.work });
  },
};
