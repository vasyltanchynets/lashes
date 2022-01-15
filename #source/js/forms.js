// FORMS
function forms() {
  //SELECT
  if ($("select").length > 0) {
    function selectscrolloptions() {
      var scs = 100;
      var mss = 50;
      if (isMobile.any()) {
        scs = 10;
        mss = 1;
      }
      var opt = {
        cursorcolor: "#2078e5",
        cursorwidth: "3px",
        background: "",
        autohidemode: false,
        bouncescroll: false,
        cursorborderradius: "0px",
        scrollspeed: scs,
        mousescrollstep: mss,
        directionlockdeadzone: 0,
        cursorborder: "0px solid #fff",
      };
      return opt;
    }

    function select() {
      $.each($("select"), function (index, val) {
        var ind = index;
        $(this).hide();
        if ($(this).parent(".select-block").length == 0) {
          $(this).wrap(
            "<div class='select-block " +
              $(this).attr("class") +
              "-select-block'></div>"
          );
        } else {
          $(this).parent(".select-block").find(".select").remove();
        }
        var milti = "";
        var check = "";
        var sblock = $(this).parent(".select-block");
        var soptions =
          "<div class='select-options'><div class='select-options-scroll'><div class='select-options-list'>";
        if ($(this).attr("multiple") == "multiple") {
          milti = "multiple";
          check = "check";
        }
        $.each($(this).find("option"), function (index, val) {
          if ($(this).attr("value") != "") {
            soptions =
              soptions +
              "<div data-value='" +
              $(this).attr("value") +
              "' class='select-options__value_" +
              ind +
              " select-options__value value_" +
              $(this).val() +
              " " +
              $(this).attr("class") +
              " " +
              check +
              "'>" +
              $(this).html() +
              "</div>";
          } else if ($(this).parent().attr("data-label") == "on") {
            if (sblock.find(".select__label").length == 0) {
              sblock.prepend(
                '<div class="select__label">' + $(this).html() + "</div>"
              );
            }
          }
        });
        soptions = soptions + "</div></div></div>";
        if ($(this).attr("data-type") == "search") {
          sblock.append(
            "<div data-type='search' class='select_" +
              ind +
              " select" +
              " " +
              $(this).attr("class") +
              "__select " +
              milti +
              "'>" +
              "<div class='select-title'>" +
              "<div class='select-title__arrow ion-ios-arrow-down'></div>" +
              "<input data-value='" +
              $(this).find('option[selected="selected"]').html() +
              "' class='select-title__value value_" +
              $(this).find('option[selected="selected"]').val() +
              "' />" +
              "</div>" +
              soptions +
              "</div>"
          );
          $(".select_" + ind)
            .find("input.select-title__value")
            .jcOnPageFilter({
              parentSectionClass: "select-options_" + ind,
              parentLookupClass: "select-options__value_" + ind,
              childBlockClass: "select-options__value_" + ind,
            });
        } else {
          sblock.append(
            "<div class='select_" +
              ind +
              " select" +
              " " +
              $(this).attr("class") +
              "__select " +
              milti +
              "'>" +
              "<div class='select-title'>" +
              "<div class='select-title__arrow ion-ios-arrow-down'></div>" +
              "<div class='select-title__value value_" +
              $(this).find('option[selected="selected"]').val() +
              "'>" +
              $(this).find('option[selected="selected"]').html() +
              "</div>" +
              "</div>" +
              soptions +
              "</div>"
          );
        }
        if ($(this).find('option[selected="selected"]').val() != "") {
          sblock.find(".select").addClass("focus");
        }
        if ($(this).attr("data-req") == "on") {
          $(this).addClass("req");
        }
        $(".select_" + ind + " .select-options-scroll").niceScroll(
          ".select-options-list",
          selectscrolloptions()
        );
      });
    }
    select();

    $("body").on("keyup", "input.select-title__value", function () {
      $(".select")
        .not($(this).parents(".select"))
        .removeClass("active")
        .find(".select-options")
        .slideUp(50);
      $(this).parents(".select").addClass("active");
      $(this)
        .parents(".select")
        .find(".select-options")
        .slideDown(50, function () {
          $(this).find(".select-options-scroll").getNiceScroll().resize();
        });
      $(this).parents(".select-block").find("select").val("");
    });
    $("body").on("click", ".select", function () {
      if (!$(this).hasClass("disabled")) {
        $(".select")
          .not(this)
          .removeClass("active")
          .find(".select-options")
          .slideUp(50);
        $(this).toggleClass("active");
        $(this)
          .find(".select-options")
          .slideToggle(50, function () {
            $(this).find(".select-options-scroll").getNiceScroll().resize();
          });

        //	var input=$(this).parent().find('select');
        //removeError(input);

        if ($(this).attr("data-type") == "search") {
          if (!$(this).hasClass("active")) {
            searchselectreset();
          }
          $(this).find(".select-options__value").show();
        }
      }
    });
    $("body").on("click", ".select-options__value", function () {
      if ($(this).parents(".select").hasClass("multiple")) {
        if ($(this).hasClass("active")) {
          if (
            $(this).parents(".select").find(".select-title__value span")
              .length > 0
          ) {
            $(this)
              .parents(".select")
              .find(".select-title__value")
              .append(
                '<span data-value="' +
                  $(this).data("value") +
                  '">, ' +
                  $(this).html() +
                  "</span>"
              );
          } else {
            $(this)
              .parents(".select")
              .find(".select-title__value")
              .data(
                "label",
                $(this).parents(".select").find(".select-title__value").html()
              );
            $(this)
              .parents(".select")
              .find(".select-title__value")
              .html(
                '<span data-value="' +
                  $(this).data("value") +
                  '">' +
                  $(this).html() +
                  "</span>"
              );
          }
          $(this)
            .parents(".select-block")
            .find("select")
            .find("option")
            .eq($(this).index() + 1)
            .prop("selected", true);
          $(this).parents(".select").addClass("focus");
        } else {
          $(this)
            .parents(".select")
            .find(".select-title__value")
            .find('span[data-value="' + $(this).data("value") + '"]')
            .remove();
          if (
            $(this).parents(".select").find(".select-title__value span")
              .length == 0
          ) {
            $(this)
              .parents(".select")
              .find(".select-title__value")
              .html(
                $(this)
                  .parents(".select")
                  .find(".select-title__value")
                  .data("label")
              );
            $(this).parents(".select").removeClass("focus");
          }
          $(this)
            .parents(".select-block")
            .find("select")
            .find("option")
            .eq($(this).index() + 1)
            .prop("selected", false);
        }
        return false;
      }

      if ($(this).parents(".select").attr("data-type") == "search") {
        $(this)
          .parents(".select")
          .find(".select-title__value")
          .val($(this).html());
        $(this)
          .parents(".select")
          .find(".select-title__value")
          .attr("data-value", $(this).html());
      } else {
        $(this)
          .parents(".select")
          .find(".select-title__value")
          .attr("class", "select-title__value value_" + $(this).data("value"));
        $(this)
          .parents(".select")
          .find(".select-title__value")
          .html($(this).html());
      }

      $(this)
        .parents(".select-block")
        .find("select")
        .find("option")
        .removeAttr("selected");
      if ($.trim($(this).data("value")) != "") {
        $(this)
          .parents(".select-block")
          .find("select")
          .val($(this).data("value"));
        $(this)
          .parents(".select-block")
          .find("select")
          .find('option[value="' + $(this).data("value") + '"]')
          .attr("selected", "selected");
      } else {
        $(this).parents(".select-block").find("select").val($(this).html());
        $(this)
          .parents(".select-block")
          .find("select")
          .find('option[value="' + $(this).html() + '"]')
          .attr("selected", "selected");
      }

      if ($(this).parents(".select-block").find("select").val() != "") {
        $(this).parents(".select-block").find(".select").addClass("focus");
      } else {
        $(this).parents(".select-block").find(".select").removeClass("focus");

        $(this).parents(".select-block").find(".select").removeClass("err");
        $(this).parents(".select-block").parent().removeClass("err");
        $(this)
          .parents(".select-block")
          .removeClass("err")
          .find(".form__error")
          .remove();
      }
      if (!$(this).parents(".select").data("tags") != "") {
        if (
          $(this)
            .parents(".form-tags")
            .find(
              '.form-tags__item[data-value="' + $(this).data("value") + '"]'
            ).length == 0
        ) {
          $(this)
            .parents(".form-tags")
            .find(".form-tags-items")
            .append(
              '<a data-value="' +
                $(this).data("value") +
                '" href="" class="form-tags__item">' +
                $(this).html() +
                '<span class="fa fa-times"></span></a>'
            );
        }
      }
      $(this).parents(".select-block").find("select").change();

      if (
        $(this).parents(".select-block").find("select").data("update") == "on"
      ) {
        select();
      }
    });
    $(document).on("click touchstart", function (e) {
      if (!$(e.target).is(".select *") && !$(e.target).is(".select")) {
        $(".select").removeClass("active");
        $(".select-options").slideUp(50, function () {});
        searchselectreset();
      }
    });
    $(document).on("keydown", function (e) {
      if (e.which == 27) {
        $(".select").removeClass("active");
        $(".select-options").slideUp(50, function () {});
        searchselectreset();
      }
    });
  }
  //FIELDS
  $("input,textarea").focus(function () {
    if ($(this).val() == $(this).attr("data-value")) {
      $(this).addClass("focus");
      $(this).parent().addClass("focus");
      if ($(this).attr("data-type") == "pass") {
        $(this).attr("type", "password");
      }
      $(this).val("");
    }
    removeError($(this));
  });
  $("input[data-value], textarea[data-value]").each(function () {
    if (this.value == "" || this.value == $(this).attr("data-value")) {
      this.value = $(this).attr("data-value");
      if (
        $(this).hasClass("l") &&
        $(this).parent().find(".form__label").length == 0
      ) {
        $(this)
          .parent()
          .append(
            '<div class="form__label">' + $(this).attr("data-value") + "</div>"
          );
      }
    }
    if (this.value != $(this).attr("data-value") && this.value != "") {
      $(this).addClass("focus");
      $(this).parent().addClass("focus");
      if (
        $(this).hasClass("l") &&
        $(this).parent().find(".form__label").length == 0
      ) {
        $(this)
          .parent()
          .append(
            '<div class="form__label">' + $(this).attr("data-value") + "</div>"
          );
      }
    }

    $(this).click(function () {
      if (this.value == $(this).attr("data-value")) {
        if ($(this).attr("data-type") == "pass") {
          $(this).attr("type", "password");
        }
        this.value = "";
      }
    });
    $(this).blur(function () {
      if (this.value == "") {
        this.value = $(this).attr("data-value");
        $(this).removeClass("focus");
        $(this).parent().removeClass("focus");
        if ($(this).attr("data-type") == "pass") {
          $(this).attr("type", "text");
        }
      }
    });
  });
  $(".form-input__viewpass").click(function (event) {
    if ($(this).hasClass("active")) {
      $(this).parent().find("input").attr("type", "password");
    } else {
      $(this).parent().find("input").attr("type", "text");
    }
    $(this).toggleClass("active");
  });

  //$('textarea').autogrow({vertical: true, horizontal: false});

  //MASKS//
  $.each($("input.phone"), function (index, val) {
    $(this).attr("type", "tel");
    $(this).focus(function () {
      $(this).inputmask("+7(999) 999 9999", {
        clearIncomplete: true,
        clearMaskOnLostFocus: true,
        onincomplete: function () {
          maskclear($(this));
        },
      });
      $(this).addClass("focus");
      $(this).parent().addClass("focus");
      $(this).parent().removeClass("err");
      $(this).removeClass("err");
    });
  });
  $("input.phone").focusout(function (event) {
    maskclear($(this));
  });
  $.each($("input.num"), function (index, val) {
    $(this).focus(function () {
      $(this).inputmask("9{1,1000}", {
        clearIncomplete: true,
        placeholder: "",
        clearMaskOnLostFocus: true,
        onincomplete: function () {
          maskclear($(this));
        },
      });
      $(this).addClass("focus");
      $(this).parent().addClass("focus");
      $(this).parent().removeClass("err");
      $(this).removeClass("err");
    });
  });
  $("input.num").focusout(function (event) {
    maskclear($(this));
  });
  /*
	$.each($('input.date'), function(index, val) {
		$(this).focus(function(){
			$(this).inputmask('dd.mm.yyyy',{
				clearIncomplete: true,
				placeholder:"_",
				//yearrange:{'minyear':n-40,'maxyear':n},
				clearMaskOnLostFocus: true,
				"onincomplete": function(){maskclear($(this));},
				"oncomplete": function(){
					$(this).datepicker("setDate",$(this).val());
				}
			});
			$(this).addClass('focus');
			$(this).parents('.form-column').addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
		$(this).focusout(function(event) {
			maskclear($(this));
		});
		$(this).datepicker({
			dateFormat : "dd.mm.yy",
			//yearRange: "1915:2015",
			//defaultDate: '-18Y', 
			//inDate: '-85Y', 
			//maxDate: "0Y",
			beforeShow :function(event){
				$('.ui-datepicker').show();
			},
			onSelect:function(event){
				if($(this).val()!=$(this).attr('data-value') && $(this).val()!=''){
					$(this).addClass('focus');
					$(this).parent().addClass('focus');
					if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
						$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
					}
				}
			}
		});
	});
	*/
}
forms();

// VALIDATE FORMS
$("form button[type=submit]").click(function () {
  var er = 0;
  var form = $(this).parents("form");
  var ms = form.data("ms");
  $.each(form.find(".req"), function (index, val) {
    er += formValidate($(this));
  });
  if (er == 0) {
    removeFormError(form);
    /*
			var messagehtml='';
		if(form.hasClass('editprofile')){
			var messagehtml='';
		}
		formLoad();
		*/

    //ОПТРАВКА ФОРМЫ
    /*
		function showResponse(html){
			if(!form.hasClass('nomessage')){
				showMessage(messagehtml);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		}
		var options={
			success:showResponse
		};
			form.ajaxForm(options);
		

		setTimeout(function(){
			if(!form.hasClass('nomessage')){
				//showMessage(messagehtml);
				showMessageByClass(ms);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		},0);

		return false;
		*/

    if (ms != null && ms != "") {
      showMessageByClass(ms);
      return false;
    }
  } else {
    return false;
  }
});
function formValidate(input) {
  var er = 0;
  var form = input.parents("form");
  if (input.attr("name") == "email" || input.hasClass("email")) {
    if (input.val() != input.attr("data-value")) {
      var em = input.val().replace(" ", "");
      input.val(em);
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input.val()) ||
      input.val() == input.attr("data-value")
    ) {
      er++;
      addError(input);
    } else {
      removeError(input);
    }
  } else {
    if (input.val() == "" || input.val() == input.attr("data-value")) {
      er++;
      addError(input);
    } else {
      removeError(input);
    }
  }
  if (input.attr("type") == "checkbox") {
    if (input.prop("checked") == true) {
      input.removeClass("err").parent().removeClass("err");
    } else {
      er++;
      input.addClass("err").parent().addClass("err");
    }
  }
  if (input.hasClass("name")) {
    if (!/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val())) {
      er++;
      addError(input);
    }
  }
  if (input.hasClass("pass-2")) {
    if (form.find(".pass-1").val() != form.find(".pass-2").val()) {
      addError(input);
    } else {
      removeError(input);
    }
  }
  return er;
}
function clearForm(form) {
  $.each(form.find(".input"), function (index, val) {
    $(this).removeClass("focus").val($(this).data("value"));
    $(this).parent().removeClass("focus");
    if ($(this).hasClass("phone")) {
      maskclear($(this));
    }
  });
}
function addError(input) {
  input.addClass("err");
  input.parent().addClass("err");
  input.parent().find(".form__error").remove();
  if (input.hasClass("email")) {
    var error = "";
    if (input.val() == "" || input.val() == input.attr("data-value")) {
      error = input.data("error");
    } else {
      error = input.data("error");
    }
    if (error != null) {
      input.parent().append('<div class="form__error">' + error + "</div>");
    }
  } else {
    if (
      input.data("error") != null &&
      input.parent().find(".form__error").length == 0
    ) {
      input
        .parent()
        .append('<div class="form__error">' + input.data("error") + "</div>");
    }
  }
  if (input.parents(".select-block").length > 0) {
    input.parents(".select-block").parent().addClass("err");
    input.parents(".select-block").find(".select").addClass("err");
  }
}
function addErrorByName(form, input__name, error_text) {
  var input = form.find('[name="' + input__name + '"]');
  input.attr("data-error", error_text);
  addError(input);
}
function addFormError(form, error_text) {
  form.find(".form__generalerror").show().html(error_text);
}
function removeFormError(form) {
  form.find(".form__generalerror").hide().html("");
}
function removeError(input) {
  input.removeClass("err");
  input.parent().removeClass("err");
  input.parent().find(".form__error").remove();

  if (input.parents(".select-block").length > 0) {
    input.parents(".select-block").parent().removeClass("err");
    input
      .parents(".select-block")
      .find(".select")
      .removeClass("err")
      .removeClass("active");
    //input.parents('.select-block').find('.select-options').hide();
  }
}
function removeFormErrors(form) {
  form.find(".err").removeClass("err");
  form.find(".form__error").remove();
}
function maskclear(n) {
  if (n.val() == "") {
    n.inputmask("remove");
    n.val(n.attr("data-value"));
    n.removeClass("focus");
    n.parent().removeClass("focus");
  }
}
function searchselectreset() {
  $.each($('.select[data-type="search"]'), function (index, val) {
    var block = $(this).parent();
    var select = $(this).parent().find("select");
    if ($(this).find(".select-options__value:visible").length == 1) {
      $(this).addClass("focus");
      $(this)
        .parents(".select-block")
        .find("select")
        .val($(".select-options__value:visible").data("value"));
      $(this)
        .find(".select-title__value")
        .val($(".select-options__value:visible").html());
      $(this)
        .find(".select-title__value")
        .attr("data-value", $(".select-options__value:visible").html());
    } else if (select.val() == "") {
      $(this).removeClass("focus");
      block
        .find("input.select-title__value")
        .val(select.find('option[selected="selected"]').html());
      block
        .find("input.select-title__value")
        .attr("data-value", select.find('option[selected="selected"]').html());
    }
  });
}
