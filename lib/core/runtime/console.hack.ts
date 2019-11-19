/* !
 * Tencent is pleased to support the open source community by making Tencent Server Web available.
 * Copyright (C) 2018 THL A29 Limited, a Tencent company. All rights reserved.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
 * http://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import * as util from "util";

import logger from "../logger/index";

let consoleHacked = false;

export const consoleHack = (): void => {
  if (!consoleHacked) {
    consoleHacked = true;

    console.originDebug = console.debug;
    console.originLog = console.log;
    console.originInfo = console.info;
    console.originDir = console.dir;
    console.originWarn = console.warn;
    console.originError = console.error;

    console.debug = (
      message?: any,
      ...optionalParams: any[]
    ): void => logger.writeLog(
      "DEBUG",
      `${util.format(message, optionalParams)}`
    );

    console.log = (
      message?: any,
      ...optionalParams: any[]
    ): void => logger.writeLog(
      "DEBUG",
      `${util.format(message, optionalParams)}`
    );

    console.info = (
      message?: any,
      ...optionalParams: any[]
    ): void => logger.writeLog(
      "INFO",
      `${util.format(message, optionalParams)}`
    );

    console.dir = (
      obj: any,
      options?: NodeJS.InspectOptions
    ): void => logger.writeLog(
      "INFO",
      `${util.inspect(obj, {
        customInspect: false,
        ...options
      })}`
    );

    console.warn = (
      message?: any,
      ...optionalParams: any[]
    ): void => logger.writeLog(
      "WARN",
      `${util.format(message, optionalParams)}`
    );

    console.error = (
      message?: any,
      ...optionalParams: any[]
    ): void => logger.writeLog(
      "ERROR",
      `${util.format(message, optionalParams)}`
    );
  }
};
