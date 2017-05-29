/* jshint -W040 */
/*
 * (c) Copyright Ascensio System SIA 2010-2017
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at Lubanas st. 125a-25, Riga, Latvia,
 * EU, LV-1021.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

"use strict";

(/**
 * @param {Window} window
 * @param {undefined} undefined
 */
	function (window, undefined) {
	var cBaseFunction = AscCommonExcel.cBaseFunction;
	var cFormulaFunctionGroup = AscCommonExcel.cFormulaFunctionGroup,
		cElementType = AscCommonExcel.cElementType,
		cNumber = AscCommonExcel.cNumber,
		cString = AscCommonExcel.cString,
		cBool = AscCommonExcel.cBool,
		cError = AscCommonExcel.cError,
		cErrorType = AscCommonExcel.cErrorType,
		cArea = AscCommonExcel.cArea,
		cArea3D = AscCommonExcel.cArea3D,
		cRef = AscCommonExcel.cRef,
		cRef3D = AscCommonExcel.cRef3D,
		cEmpty = AscCommonExcel.cEmpty,
		cArray = AscCommonExcel.cArray,
		cubeScheme = {};

	cFormulaFunctionGroup.Cube = cFormulaFunctionGroup.Cube || [];
	cFormulaFunctionGroup.Cube.push(cCUBEKPIMEMBER, cCUBEMEMBER, cCUBEMEMBERPROPERTY, cCUBERANKEDMEMBER, cCUBESET,
		cCUBESETCOUNT, cCUBEVALUE);

	var xmla = new Xmla({
// 		listeners: {
// 			events: Xmla.EVENT_ERROR,
// 			handler: function (eventName, eventData, xmla) {
// 				console.log(eventData.exception);
// //        alert(
// //          "Snap, an error occurred: " + eventData.exception.message + " (" + eventData.exception.code + ")" +
// //          (eventData.exception.code === Xmla.Exception.HTTP_ERROR_CDE
// //            ? "\nstatus: " + eventData.exception.data.status + "; statusText: " + eventData.exception.data.statusText
// //            : "")
// //        );
// 			}
// 		},
		async: true
	});

	function xmla_request(func, prop) {
		var xmla = new Xmla({async: true});
		// return function () {
		return new RSVP.Promise(function (resolve, reject) {
			prop.success = function (xmla, options, response) {
				if (response.numRows > 0) {
					resolve(response);
				} else {
					reject();
				}
			};
			prop.error = function (xmla, options, response) {
				reject(response);
			};
			xmla[func](prop);
		});
	}

	function xmla_request_retry(func, prop) {
		return xmla_request(func, prop)
			.then(undefined, function (response) {
				// fix mondrian Internal and Sql errors
				if (response) {
					switch (response.code) {
						case "SOAP-ENV:Server.00HSBE02":
						case "SOAP-ENV:00UE001.Internal Error":
							return xmla_request(func, prop);
					}
				}
				throw response;
			});
	}

	function getProperties(connection) {
		var connections = {
			xmla: {
				prop: {
					url: "https://d1.erp5.ru/saiku/xmla",
					properties: {
						DataSourceInfo: "FoodMart",
						Catalog: "FoodMart"
					}
				},
				cube: "Sales"
			}
		};
		connection = connections[connection];
		connection = JSON.parse(JSON.stringify(connection));
		return connection;
	}

	function getScheme(connection) {
		var scheme = cubeScheme[connection];
		if (scheme) {
			return scheme;
		} else {
			scheme = {members: {}};
			cubeScheme[connection] = scheme;
			return scheme;
		}
	}

	function getCell(arg0) {
		if (arg0 instanceof cArray) {
			arg0 = arg0.getElement(0);
			// } else if (arg0 instanceof cArea || arg0 instanceof cArea3D) {
			// 	arg0 = arg0.cross(arguments[1].bbox);
		} else if (arg0 instanceof cRef || arg0 instanceof cRef3D) {
			arg0 = arg0.getValue();
		}
		return arg0;
	}

	function parseArgs(mdx_array) {
		return function () {
			var members = [];

			function stringForge(value) {
				var array;
				if (value.cube_value) {
					array = value.cube_value;
				} else {
					array = value.value.split(',');
				}
				if (array.length > 0) {
					// filter members already existed
					members = members.filter(function (i) {
						return i in array;
					});
					members = members.concat(array);
				}
			}

			function cellForge(cell) {
				if (cell) {
					if (cell.oValue.type === cElementType.error) {
						// debugger;
						throw "";
					}
					if (cell.formulaParsed && cell.formulaParsed.value) {
						stringForge(cell.formulaParsed.value);
					} else {
						stringForge({value: cell.getValue()});
					}
				}
			}

			mdx_array.forEach(function (element) {
				switch (element.type) {
					case cElementType.cellsRange:
					case cElementType.cellsRange3D:
					case cElementType.array:
						element.foreach(cellForge);
						break;
					default:
						if (element instanceof cRef || element instanceof cRef3D) {
							element.getRange().getCells().forEach(cellForge);
						} else {
							stringForge(element);
						}
				}
			});
			return members;
		};
	}

	function execute(connection) {
		return new RSVP.Queue()
			.push(function () {
				var settings = getProperties(connection),
					prop = settings.prop,
					scheme = getScheme(),
					hierarchies = scheme.hierarchies,
					hierarchy,
					mdx = [];
				for (hierarchy in hierarchies) {
					mdx.push("{" +hierarchies[hierarchy].join(",") + "}");
				}
				prop.statement = "SELECT " + mdx.join("*") +
					" ON 0 FROM [" + settings.cube + "]";
				return xmla_request("execute", prop);
			})
			.push(function (dataset) {
				var cellset = dataset.getCellset(),
					axis_count = dataset.axisCount(),
					cell_id = 0,
					axis_id,
					axis,
					cube = {
						axes: {length: axis_count},
						members: {},
						hierarchies: {length: 0},
						cells: []
					};


				function collectAxes(axisIndex, parent_members) {
					var member;
					if (typeof(axisIndex) === "undefined") {
						axisIndex = axis_count - 1;
						parent_members = [];
					}
					axis = dataset.getAxis(axisIndex);

					axis.eachTuple(function (tuple) {
						var coordinate_tuple = [];
						this.eachHierarchy(function (hierarchy) {
							member = this.member();
							coordinate_tuple.push(member.UName);
						});

						if (axisIndex) {
							collectAxes(axisIndex - 1, parent_members.concat(coordinate_tuple));
						} else {
							console.log(parent_members.concat(coordinate_tuple) + ' - ' + cube.cells[cell_id]);
							cell_id++;
						}
					});
					axis.reset();
				}

				for (axis_id = 0; axis_id < axis_count; axis_id++) {
					axis = dataset.getAxis(axis_id);
					cube.axes[axis_id] = {
						tuples: {},
						length: 0
					};
					axis.eachTuple(function (tuple) {
						var coordinate_tuple = [];
						axis.eachHierarchy(function () {
							var member = this.member();
							if (!cube.members.hasOwnProperty(member.UName)) {
								cube.members[member.UName] = member;
							}
							coordinate_tuple.push(member.UName);
						});
						cube.axes[axis_id].tuples[coordinate_tuple.join(',')] = tuple.index;
						cube.axes[axis_id].length++;
					});
					axis.eachHierarchy(function (hierarchy) {
						cube.hierarchies[hierarchy.name] = {
							axis_id: axis_id, tuple_id: hierarchy.index, name: hierarchy.name
						};
						cube.hierarchies[cube.hierarchies.length] = cube.hierarchies[hierarchy.name];
						cube.hierarchies['' + axis_id + ',' + hierarchy.index] = cube.hierarchies[hierarchy.name];
						cube.hierarchies.length++;
					});
				}

				do {
					cube.cells[cellset.cellOrdinal()] = cellset.cellValue();
				} while (cellset.nextCell() > 0);
				collectAxes();
				return cube;
			});
	}

	/**
	 * @constructor
	 * @extends {AscCommonExcel.cBaseFunction}
	 */
	function cCUBEKPIMEMBER() {
		this.name = "CUBEKPIMEMBER";
		this.value = null;
		this.argumentsCurrent = 0;
	}

	cCUBEKPIMEMBER.prototype = Object.create(cBaseFunction.prototype);
	cCUBEKPIMEMBER.prototype.constructor = cCUBEKPIMEMBER;

	/**
	 * @constructor
	 * @extends {AscCommonExcel.cBaseFunction}
	 */
	function cCUBEMEMBER() {
		this.name = "CUBEMEMBER";
		this.value = null;
		this.argumentsCurrent = 0;
	}

	cCUBEMEMBER.prototype = Object.create(cBaseFunction.prototype);
	cCUBEMEMBER.prototype.constructor = cCUBEMEMBER;
	cCUBEMEMBER.prototype.argumentsMin = 2;
	cCUBEMEMBER.prototype.argumentsMax = 3;
	cCUBEMEMBER.prototype.Calculate = function (arg) {
		var connection = getCell(arg[0]),
			mdx_array = [arg[1]],
			caption = getCell(arg[2]);
		if (caption) {
			caption = caption.getValue();
		}
		return function () {
			return new RSVP.Queue()
				.push(parseArgs(mdx_array))
				.push(function (members) {
					var promises = [],
						i;

					function discoverMember(connection, member_name) {
						var settings = getProperties(connection),
							prop = settings.prop;
						prop.restrictions = {
//      'CATALOG_NAME': 'FoodMart',
							'MEMBER_UNIQUE_NAME': member_name,
							'CUBE_NAME': settings.cube
						};
						return xmla_request_retry("discoverMDMembers", prop);
					}

					for (i = 0; i < members.length; i++) {
						if (members[i]) {
							promises.push(discoverMember(connection, members[i]));
						}
					}
					return RSVP.all(promises);
				})
				.push(function (responses) {
					var last_id = responses.length - 1,
						ret,
						scheme = getScheme(connection);
					if (!caption) {
						caption = responses[last_id].getMemberCaption();
					}
					ret = new cString(caption);
					ret.ca = true;
					ret.cube_value = responses.map(function (r) {
						var uname = r.getMemberUniqueName(),
							member = scheme.members[uname];
						if (!member) {
							scheme.members[uname] = {h: r.getHierarchyUniqueName()};
						}
						return uname;
					});
					return ret;
				})
				.push(undefined, function () {
					return new cError(cErrorType.not_available);
				});
		};
	};
	cCUBEMEMBER.prototype.getInfo = function () {
		return {
			name: this.name, args: "( x )"
		};
	};


	/**
	 * @constructor
	 * @extends {AscCommonExcel.cBaseFunction}
	 */
	function cCUBEMEMBERPROPERTY() {
		this.name = "CUBEMEMBERPROPERTY";
		this.value = null;
		this.argumentsCurrent = 0;
	}

	cCUBEMEMBERPROPERTY.prototype = Object.create(cBaseFunction.prototype);
	cCUBEMEMBERPROPERTY.prototype.constructor = cCUBEMEMBERPROPERTY;

	/**
	 * @constructor
	 * @extends {AscCommonExcel.cBaseFunction}
	 */
	function cCUBERANKEDMEMBER() {
		this.name = "CUBERANKEDMEMBER";
		this.value = null;
		this.argumentsCurrent = 0;
	}

	cCUBERANKEDMEMBER.prototype = Object.create(cBaseFunction.prototype);
	cCUBERANKEDMEMBER.prototype.constructor = cCUBERANKEDMEMBER;

	/**
	 * @constructor
	 * @extends {AscCommonExcel.cBaseFunction}
	 */
	function cCUBESET() {
		this.name = "CUBESET";
		this.value = null;
		this.argumentsCurrent = 0;
	}

	cCUBESET.prototype = Object.create(cBaseFunction.prototype);
	cCUBESET.prototype.constructor = cCUBESET;

	/**
	 * @constructor
	 * @extends {AscCommonExcel.cBaseFunction}
	 */
	function cCUBESETCOUNT() {
		this.name = "CUBESETCOUNT";
		this.value = null;
		this.argumentsCurrent = 0;
	}

	cCUBESETCOUNT.prototype = Object.create(cBaseFunction.prototype);
	cCUBESETCOUNT.prototype.constructor = cCUBESETCOUNT;

	/**
	 * @constructor
	 * @extends {AscCommonExcel.cBaseFunction}
	 */
	function cCUBEVALUE() {
		this.name = "CUBEVALUE";
		this.value = null;
		this.argumentsCurrent = 0;
	}

	cCUBEVALUE.prototype = Object.create(cBaseFunction.prototype);
	cCUBEVALUE.prototype.constructor = cCUBEVALUE;
	cCUBEVALUE.prototype.Calculate = function (arg, rangeCell, isDefName, ws, context) {
		var connection = getCell(arg[0]),
			mdx_array = arg.slice(1);
		return new RSVP.Queue()
			.push(parseArgs(mdx_array))
			.push(function (members, cube) {
				var cell_id = 0,
					p_d = 1,
					h,
					member_path,
					coordinate = [],
					i;
				for (i = 0; i < cube.hierarchies.length; i++) {
					h = cube.hierarchies[i];
					coordinate[h.axis_id] = [];
					coordinate[h.axis_id][h.tuple_id] = null;
				}
				for (i = 0; i < members.length; i++) {
					member_path = members[i];
					h = cube.members[member_path];
					if (h === undefined) {
						throw "query result not contain data for member:" +
						member_path;
					}
					h = h.hierarchy;
					h = cube.hierarchies[h];
					coordinate[h.axis_id][h.tuple_id] = member_path;
				}
				coordinate = coordinate.map(function (axis, axis_id) {
					axis.forEach(function (h, h_id) {
						if (h === null) {
							throw "Axis:" + axis_id + " hierarchy:" +
							cube.hierarchies[axis_id + ',' + h_id].name +
							" not determinated";
						}
					});
					return axis.join(',');
				});
				coordinate.forEach(function (tuple, axis_id) {
					var axis = cube.axes[axis_id];
					cell_id = p_d * axis.tuples[tuple] + cell_id;
					p_d = p_d * axis.length;
				});
				return new cNumber(cube.cells[cell_id]);
			})
			.push(undefined, function () {
				return new cError(cErrorType.not_available);
			});
	};
})
(window);
