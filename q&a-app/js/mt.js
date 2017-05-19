(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['index'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.q_partial,depth0,{"name":"q_partial","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"grid-100\">\n  <h1 class=\"name align-center\">Code Q&amp;A</h1>\n\n  <!-- question form -->\n  <form class=\"question-form\">\n    <div class=\"grid-parent\">\n      <div class=\"grid-100 circle--input--group\">\n        <input type=\"text\" placeholder=\"What's your question?\" id=\"question\">\n        <input class=\"button-primary question\" type=\"submit\" value=\"Ask\">\n      </div>\n    </div>\n  </form><!-- /question form -->\n\n  <h2>Top Questions</h2>\n  <hr>\n\n  <!-- questions -->\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</div>\n";
},"usePartial":true,"useData":true});
templates['question'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.a_partial,depth0,{"name":"a_partial","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"grid-100\">\n\n  <!-- main question -->\n  <h2 class=\"question-heading\">"
    + container.escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</h2>\n  <hr><!-- /main question -->\n\n  <!-- answers -->\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.answers : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  <!-- /answers -->\n\n  <h3>Add an Answer</h3>\n\n  <!-- answer form -->\n  <form>\n    <textarea class=\"full-width\" placeholder=\"Your answer...\" id=\"message\"></textarea>\n    <input class=\"button-primary answer\" type=\"submit\" value=\"Post answer\">\n  </form><!-- /answer form -->\n</div>\n";
},"usePartial":true,"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
Handlebars.partials['a_partial'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"grid-parent answer-container\" data-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n  <div class=\"grid-10\">\n    <div class=\"answer-voting\">\n      <span class=\"icon-chevron-up\"></span>\n      <strong class=\"vote-count\">"
    + alias4(((helper = (helper = helpers.votes || (depth0 != null ? depth0.votes : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"votes","hash":{},"data":data}) : helper)))
    + "</strong></a>\n      <span class=\"icon-chevron-down\"></span>\n    </div>\n  </div>\n  <div class=\"grid-90\">\n    <a href=\"#\">\n      <p>"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</p>\n    </a>\n    <div class=\"align-right\">\n      <small>Answered <strong>"
    + alias4((helpers.questionDateFormat || (depth0 && depth0.questionDateFormat) || alias2).call(alias1,(depth0 != null ? depth0.createdAt : depth0),{"name":"questionDateFormat","hash":{},"data":data}))
    + "</strong> |</small> \n      <small>Modified <strong>"
    + alias4((helpers.questionDateFormat || (depth0 && depth0.questionDateFormat) || alias2).call(alias1,(depth0 != null ? depth0.updatedAt : depth0),{"name":"questionDateFormat","hash":{},"data":data}))
    + "</strong></small>\n    </div>\n  </div>\n</div>\n<hr>\n";
},"useData":true});
Handlebars.partials['answer_edit_form'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<form>\n  <textarea class=\"full-width\" placeholder=\"Your answer...\">"
    + container.escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"text","hash":{},"data":data}) : helper)))
    + "</textarea>\n  <input class=\"button-primary\" type=\"submit\" id=\"editAnswerSubmit\" value=\"Submit changes\">\n  <input class=\"button-warning\" type=\"button\" id=\"editAnswerCancel\" value=\"Cancel\">\n  <input class=\"button-danger\" type=\"button\" id=\"editAnswerDelete\" value=\"Delete answer\">\n</form>\n";
},"useData":true});
Handlebars.partials['q_partial'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"grid-parent question\">\n  <div class=\"grid-10\">\n    <img class=\"avatar\" src=\"images/avatar.png\" alt=\"avatar\">\n  </div>\n  <div class=\"grid-90\">\n    <a href=\"question.html\" data-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n      <p>"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</p>\n      <small class=\"align-right block\">Asked <strong>"
    + alias4((helpers.indexDateFormat || (depth0 && depth0.indexDateFormat) || alias2).call(alias1,(depth0 != null ? depth0.createdAt : depth0),{"name":"indexDateFormat","hash":{},"data":data}))
    + "</strong></small>\n    </a>\n  </div>\n</div> \n";
},"useData":true});
})();