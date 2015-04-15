"use strict";

(
	/**
	 * @param {window} window
	 * @param {undefined} undefined
	 */
	function(window, undefined) {
		var asc = window["Asc"] ? window["Asc"] : (window["Asc"] = {});

		// tracking type by license type
		var c_TrackingType = {
			TT_USER_COUNT: 0,			// by user count
			TT_ACTIVE_CONNECTION: 1,	// by active connections
			TT_TIME_USAGE: 2,			// by time of editing
			TT_DOCUMENT_SESSION: 3,		// by document editing session count
			TT_NONE: 4,					// no tracking
			TT_USER_COUNT_2: 5,			// by user count, without active/inactive detection
			TT_ACTIVE_CONNECTION_AWS: 6	// by active connections (only on aws instance)
		};

		function CTrackFile(obj) {
			this.trackingType = c_TrackingType.TT_USER_COUNT;
			this.licenseId = null;
			this.trackingUrl = g_sTrackingServiceLocalUrl;
			this.isPeriodicalyTracking = false;
			this.isAliveTrackingOnly = false;
			this.isTrackDone = false;
			this.bAliveUser2 = false;

			if (undefined != obj && null != obj) {
				if (undefined != obj["licenseId"] && null != obj["licenseId"])
					this.licenseId = obj["licenseId"];

				if (undefined != obj["trackingType"] && null != obj["trackingType"])
					this.trackingType = obj["trackingType"];

				if (undefined != obj["trackingUrl"] && null != obj["trackingUrl"])
					this.trackingUrl = obj["trackingUrl"];
			}

			switch (this.trackingType) {
				case c_TrackingType.TT_ACTIVE_CONNECTION:
				case c_TrackingType.TT_ACTIVE_CONNECTION_AWS:
					this.isPeriodicalyTracking = true;
					this.isAliveTrackingOnly = false;
					break;

				case c_TrackingType.TT_DOCUMENT_SESSION:
					this.isPeriodicalyTracking = false;
					this.isAliveTrackingOnly = true;
					break;

				case c_TrackingType.TT_USER_COUNT_2:
					this.bAliveUser2 = true;				// Сразу выставляем, что пользователь активный
					this.isPeriodicalyTracking = false;
					this.isAliveTrackingOnly = true;
					break;

				case c_TrackingType.TT_NONE:
					this.isTrackDone = true;
					this.isPeriodicalyTracking = false;
					break;

				default:
					break;
			}

			this.sendTrackFunc = null;
			this.trackingInterval = 300 * 1000;
			this.docId = null;
			this.userId = null;

			this.bAliveUser = false;
		}

		CTrackFile.prototype.Start = function () {
			var oThis = this;

			if (this.isPeriodicalyTracking || !this.isTrackDone) {
				var _OnTrackingTimer = function () {
					oThis.Start();
				};

				var _OnSendTrack = function () {
					setTimeout(_OnTrackingTimer, oThis.trackingInterval);
				};

				if (this.isAliveTrackingOnly && !this.bAliveUser && !this.bAliveUser2) {
					_OnSendTrack();
				} else {
					this.isTrackDone = true;
					this._sendTrack(_OnSendTrack);
				}
			}
		};

		CTrackFile.prototype.Stop = function () {
		};

		CTrackFile.prototype.setInterval = function (inverval) {
			this.trackingInterval = inverval * 1000;
		};
		CTrackFile.prototype.setDocId = function (docId) {
			this.docId = docId;
		};
		CTrackFile.prototype.setUserId = function (userId) {
			this.userId = userId;
		};
		CTrackFile.prototype.setTrackFunc = function (func) {
			if (undefined != func)
				this.sendTrackFunc = func;
		};
		CTrackFile.prototype.setUserAlive = function () {
			this.bAliveUser = true;
		};
		CTrackFile.prototype._sendTrack = function (callback) {
			var rData = {
				"docId": this.docId,
				"clientId": this.userId,
				"isAlive": this.bAliveUser ? 1 : 0
			};

			// Сбрасываем активность пользователя после отправки, т.к. она пойдет заново
			this.bAliveUser = false;

			if (this.sendTrackFunc != null)
				this.sendTrackFunc(callback, this.trackingUrl, JSON.stringify(rData));
		};

		asc.CTrackFile = CTrackFile;
	}
)(window, undefined);